import asyncio
import logging
from datetime import datetime, timezone
from typing import Annotated, Any
from uuid import UUID

from fastapi import Depends, WebSocket
from pydantic import ValidationError

from src.core.redis.depends import redis_storage
from src.entries.group.group.dao import GroupDaoProtocol
from src.entries.message.depends import MessageServiceDep
from src.entries.message.schemas import (
    MessageCreate,
    MessageInternalCreate,
    MessageUpdate,
)
from src.entries.websocket.enums import UserStatus
from src.entries.websocket.schemas import (
    WsBaseEvent,
    WsEventCategoryEnum,
    WsEventCreate,
    WsMessageCreate,
    WsMessageRead,
    WsMessageUpdate,
)

log = logging.getLogger(__name__)


class ConnectionManager:
    def __init__(self, redis):
        self.redis = redis
        self.active_connections: dict[UUID, list[WebSocket]] = {}

        self._pubsub = self.redis.pubsub()
        self._listener_task: Any | None = None

    async def connect(self, websocket: WebSocket, user_id: UUID) -> None:
        await websocket.accept()
        self.active_connections.setdefault(user_id, []).append(websocket)

        await self.redis.hset(
            f"user:{user_id}",
            mapping={
                "status": UserStatus.ONLINE,
                "last_updated": datetime.now(timezone.utc).isoformat(),
            },
        )
        await self.subscribe_if_needed()

    async def subscribe_if_needed(self):
        channels = [c.value for c in WsEventCategoryEnum]
        await self._pubsub.subscribe(*channels)
        if not self._listener_task:
            log.info("start redis subscriber loop")
            self._listener_task = asyncio.create_task(self.redis_subscriber_loop())

    async def broadcast_group_message(
        self,
        event: Any,
        user_id: UUID,
        message_service,
        group_service,
    ) -> None:
        handlers = {
            WsEventCategoryEnum.MESSAGE_CREATE: self._handle_message_create,
            WsEventCategoryEnum.MESSAGE_UPDATE: self._handle_message_update,
        }

        handler = handlers.get(event.category)
        if handler:
            await handler(event, user_id, message_service, group_service)

    async def _handle_message_create(
        self,
        event: Any,
        user_id: UUID,
        message_service: MessageServiceDep,
        group_service: GroupDaoProtocol,
    ) -> None:
        if isinstance(event, dict):
            try:
                event = WsMessageCreate.model_validate(event)
            except Exception:
                event = WsEventCreate.model_validate(event)

        if isinstance(event, WsMessageCreate):
            message_payload = event.data
        else:
            data = getattr(event, "data", None)
            if data is None:
                raise ValueError("no data in event")
            if isinstance(data, dict):
                message_payload = MessageCreate.model_validate(data)
            else:
                message_payload = data

        message_data = MessageInternalCreate(
            **message_payload.model_dump(),  # pydantic v2
            user_id=user_id,
        )
        message = await message_service.create(message_data, returning=True)
        user_ids = await group_service.get_user_ids_in_group(message.to_group_id)

        for uid in user_ids:
            ws_event = WsMessageRead(
                category=WsEventCategoryEnum.MESSAGE_CREATE,
                data=message,
                to_user=uid,
            )
            await self.redis.publish(
                WsEventCategoryEnum.MESSAGE_CREATE.value,
                ws_event.model_dump_json(),
            )

    async def _handle_message_update(
        self,
        event: Any,
        user_id: UUID,
        message_service: MessageServiceDep,
        group_service: GroupDaoProtocol,
    ) -> None:
        if isinstance(event, dict):
            try:
                event = WsMessageUpdate.model_validate(event)
            except Exception:
                event = WsBaseEvent.model_validate(event)

        raw_data = getattr(event, "data", None)
        if raw_data is None:
            raise ValueError("MessageUpdate event has no data")

        if isinstance(raw_data, dict):
            update_data = MessageUpdate.model_validate(raw_data)
        else:
            update_data = raw_data

        msg_id = getattr(event, "id", None)
        if msg_id is None:
            raise ValueError("MessageUpdate event must contain id")

        message = await message_service.update(
            update_data,
            returning=True,
            id=msg_id,
        )

        group_id = message.to_group_id
        user_ids = await group_service.get_user_ids_in_group(group_id)

        for uid in user_ids:
            ws_event = WsMessageRead(
                category=WsEventCategoryEnum.MESSAGE_UPDATE,
                data=message,
                to_user=uid,
            )
            await self.redis.publish(
                WsEventCategoryEnum.MESSAGE_UPDATE.value,
                ws_event.model_dump_json(),
            )

    async def redis_subscriber_loop(self):
        async for raw_message in self._pubsub.listen():
            if raw_message.get("type") != "message":
                continue

            channel = raw_message.get("channel")
            try:
                if isinstance(channel, (bytes, bytearray)):
                    channel = channel.decode()

                data = raw_message.get("data")

                message = WsMessageRead.model_validate_json(data)
                await self.send_local_chat(message)
            except ValidationError as e:
                log.error("Error processing message from channel %s: %s", channel, e)
            except Exception as e:
                log.exception("Unexpected error in redis_subscriber_loop: %s", e)

    async def send_local_chat(self, data: WsMessageRead):
        connections = self.active_connections.get(data.to_user)
        if not connections:
            return

        data_json = data.model_dump_json()
        for connection in connections:
            await connection.send_text(data_json)

    async def disconnect(self, ws: WebSocket, user_id: UUID):
        try:
            await ws.close()
        except RuntimeError:
            pass

        await self.redis.hset(
            f"user:{user_id}",
            {
                "status": UserStatus.OFFLINE,
                "last_updated": datetime.now(timezone.utc).isoformat(),
            },
        )

        if user_id in self.active_connections:
            if ws in self.active_connections[user_id]:
                self.active_connections[user_id].remove(ws)
            if not self.active_connections[user_id]:
                del self.active_connections[user_id]


def get_connection_managet(redis: redis_storage):
    return ConnectionManager(redis)


ConnectionManagerDep = Annotated[ConnectionManager, Depends(get_connection_managet)]

__all__ = ["ConnectionManagerDep"]
