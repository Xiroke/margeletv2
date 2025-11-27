import asyncio
import logging
from datetime import datetime, timezone
from typing import Annotated, Any
from uuid import UUID, uuid4

from fastapi import Depends, WebSocket
from pydantic import ValidationError

from src.core.redis.depends import redis_storage
from src.entries.group.group.dao import GroupDaoProtocolParent
from src.entries.message.depends import MessageServiceDep
from src.entries.message.schemas import MessageCreate
from src.entries.websocket.enums import UserStatus
from src.entries.websocket.schemas import (
    WsEventCategoryEnum,
    WsEventRead,
    WsMessageRead,
)

log = logging.getLogger(__name__)


class ConnectionManager:
    """
    This class for control sending and receiving messages using websocket
    and redis subscriber for work with some uvicorn workers
    """

    def __init__(self, redis: redis_storage):
        self.redis = redis
        # {user_id: [ws1, ws2]}
        self.active_connections: dict[UUID, list[WebSocket]] = {}

        self._pubsub = self.redis.pubsub()
        self._listener_task: Any | None = None

    async def connect(self, websocket: WebSocket, user_id: UUID) -> None:
        """
        Connect user to websocket
        """
        await websocket.accept()

        self.active_connections.setdefault(user_id, []).append(websocket)

        await self.redis.hset(
            f"user:{str(user_id)}",
            mapping={
                "status": UserStatus.ONLINE,
                "last_updated": datetime.now(timezone.utc).isoformat(),
            },
        )  # pyright: ignore[reportGeneralTypeIssues]

        await self.subscribe_if_needed()

    async def subscribe_if_needed(self):
        """
        Subscribe current worker to redis
        """
        await self._pubsub.subscribe(WsEventCategoryEnum.MESSAGE)

        if not self._listener_task:
            log.info("start redis subscriber loop")

            self._listener_task = asyncio.create_task(self.redis_subscriber_loop())

    async def broadcast_group_message(
        self,
        obj: MessageCreate,
        message_service: MessageServiceDep,
        group_service: GroupDaoProtocolParent,
    ) -> None:
        message = await message_service.create(obj, returning=True)

        user_ids = await group_service.get_user_ids_in_group(message.to_group_id)

        ws_data = WsMessageRead(
            category=WsEventCategoryEnum.MESSAGE, data=message, to_user=uuid4()
        )

        # send message to all users
        for user_id in user_ids:
            ws_data.to_user = user_id
            await self.redis.publish(
                WsEventCategoryEnum.MESSAGE,
                ws_data.model_dump_json(),
            )

        log.debug("Message is broadcasted")

    async def redis_subscriber_loop(self):
        """
        Handle redis message
        """

        # example raw_message
        # {'type': 'subscribe', 'pattern': None, 'channel': b'message', 'data': 1}
        async for raw_message in self._pubsub.listen():
            if raw_message["type"] != WsEventCategoryEnum.MESSAGE:
                continue

            try:
                message = WsMessageRead.model_validate_json(raw_message["data"])
                await self.send_local_chat(message)
            except ValidationError as e:
                log.error(f"Error processing message: {e}")

    async def send_local_chat(self, data: WsEventRead):
        """
        Every worker send message to all users in current chat
        """

        # chat_id set when user connected
        connections = self.active_connections.get(data.to_user)

        if connections is None:
            return

        data_json = data.model_dump_json()
        for connection in connections:
            await connection.send_text(data_json)

    async def disconnect(
        self,
        ws: WebSocket,
        user_id: UUID,
    ) -> None:
        """
        Disconnect user
        """
        if user_id not in self.active_connections.keys():
            return

        try:
            # raise exception if user is already disconnected
            await ws.close()
        except RuntimeError:
            pass

        await self.redis.hset(
            f"user:{str(user_id)}",
            mapping={
                "status": UserStatus.OFFLINE,
                "last_updated": datetime.now(timezone.utc).isoformat(),
            },
        )  # pyright: ignore[reportGeneralTypeIssues]

        if ws in self.active_connections[user_id]:
            self.active_connections[user_id].remove(ws)

        if not self.active_connections[user_id]:
            del self.active_connections[user_id]


def get_connection_managet(redis: redis_storage):
    return ConnectionManager(redis)


ConnectionManagerDep = Annotated[ConnectionManager, Depends(get_connection_managet)]

__all__ = ["ConnectionManagerDep"]
