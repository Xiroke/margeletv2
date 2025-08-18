import asyncio
import logging
from typing import Any
from uuid import UUID

from fastapi import WebSocket
from pydantic import ValidationError

from src.core.redis.enums import ChannelsEnum
from src.core.redis.redis import redis_client
from src.entries.auth.user.schemas import ReadUserSchema
from src.entries.message.depends import MessageServiceDep
from src.entries.message.id_to_username.depends import IdToUsernameDaoDep
from src.entries.message.id_to_username.schemas import CreateIdToUsernameModelSchema
from src.entries.message.schemas import CreateMessageSchema, SendMessageSchema

log = logging.getLogger(__name__)


class ConnectionManager:
    """
    This class for control sending and receiving messages using websocket
    and redis subscriber for work with some uvicorn workers
    """

    def __init__(self):
        self.active_connections: dict[UUID, list[WebSocket]] = {}  # {user_id: ws}
        self.chats_connections: dict[
            UUID, set[UUID]
        ] = {}  # {chat_id: [user_id]}all online users in each chat
        # subscribed_chats by redis
        self._subscribed_chats: set[UUID] = set()
        self._pubsub = redis_client.pubsub()
        self._listener_task: Any | None = None

    async def connect(
        self, websocket: WebSocket, user_id: UUID, id_user_chats: list[UUID]
    ) -> None:
        """
        Connect user to websocket
        """
        await websocket.accept()

        self.active_connections.setdefault(user_id, []).append(websocket)

        for chat_id in id_user_chats:
            await self.subscribe_if_needed(chat_id)

            self.chats_connections.setdefault(chat_id, set())

            if user_id not in self.chats_connections[chat_id]:
                self.chats_connections[chat_id].add(user_id)

    async def subscribe_if_needed(self, chat_id: UUID):
        """
        Subscribe current worker to redis
        """
        # prevent dublication
        if chat_id in self._subscribed_chats:
            return

        await self._pubsub.subscribe(f"{ChannelsEnum.MESSAGES.value}:{chat_id}")
        self._subscribed_chats.add(chat_id)

        if not self._listener_task:
            await self.start()

    async def start(self):
        """
        Start redis subscriber loop
        """
        log.info("start redis subscriber loop")

        self._listener_task = asyncio.create_task(self.redis_subscriber_loop())

    async def broadcast(
        self,
        user: ReadUserSchema,
        raw_message: CreateMessageSchema,
        message_service: MessageServiceDep,
        id_user_dao: IdToUsernameDaoDep,
    ) -> None:
        """Send message to redis, it will be send to all users in chat"""

        # we get data and add username to it
        message = await message_service.create(raw_message)

        username_db = await id_user_dao.get(message.user_id)

        if not username_db:
            username_db = await id_user_dao.create(
                CreateIdToUsernameModelSchema(id=message.user_id, username=user.name)
            )

        message.author = username_db.username

        data_to_send = SendMessageSchema(data=message, chat_id=message.to_chat_id)

        # send message to all users
        await redis_client.publish(
            f"{ChannelsEnum.MESSAGES.value}:{message.to_chat_id}",
            data_to_send.model_dump_json(),
        )

    async def redis_subscriber_loop(self):
        """
        Handle redis message
        """

        async for raw_message in self._pubsub.listen():
            if raw_message["type"] != "message":
                continue

            try:
                message = SendMessageSchema.model_validate_json(raw_message["data"])
                await self.send_local_chat(message)
            except ValidationError as e:
                log.error(f"Error processing message: {e}")

    async def send_local_chat(self, data: SendMessageSchema):
        """
        Every worker send message to all users in current chat
        """

        tasks = []

        # chat_id set when user connected
        for user_id in self.chats_connections[data.chat_id]:
            for connection in self.active_connections[user_id]:
                tasks.append(connection.send_text(data.model_dump_json()))

        await asyncio.gather(*tasks, return_exceptions=True)

        log.info("redis subscriber loop stopped")

    async def disconnect(
        self,
        ws: WebSocket,
        user_id: UUID,
        chats_id: list[UUID],
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

        # if user connect from other device, we not remove it
        self.active_connections[user_id].remove(ws)
        if not self.active_connections[user_id]:
            del self.active_connections[user_id]

        try:
            for chat_id in chats_id:
                self.chats_connections[chat_id].discard(user_id)
        # need to fix, i forget what need to fix
        except Exception:
            pass


connection_manager_users = ConnectionManager()

__all__ = ["connection_manager_users"]
