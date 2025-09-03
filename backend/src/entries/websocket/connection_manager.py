import logging
from datetime import datetime, timezone
from typing import Annotated, Any
from uuid import UUID

from fastapi import Depends, WebSocket

from src.core.redis.depends import redis_storage
from src.entries.auth.user.schemas import ReadUserSchema
from src.entries.message.depends import MessageServiceDep
from src.entries.message.id_to_username.depends import IdToUsernameServiceDep
from src.entries.message.id_to_username.schemas import CreateIdToUsernameModelSchema
from src.entries.message.schemas import CreateMessageSchema
from src.entries.websocket.enums import UserStatus

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

        # subscribed_chats by redis
        self._subscribed_chats: set[UUID] = set()
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

        # await self.subscribe_if_needed(user_id)

    # async def subscribe_if_needed(self, user_id: UUID):
    #     """
    #     Subscribe current worker to redis
    #     """
    #     # prevent dublication
    #     if user_id in self._subscribed_chats:
    #         return

    #     await self._pubsub.subscribe(f"{ChannelsEnum.MESSAGES.value}:{chat_id}")
    #     self._subscribed_chats.add(chat_id)

    #     if not self._listener_task:
    #         await self.start()

    # async def start(self):
    #     """
    #     Start redis subscriber loop
    #     """
    #     log.info("start redis subscriber loop")

    #     self._listener_task = asyncio.create_task(self.redis_subscriber_loop())

    async def broadcast(
        self,
        user: ReadUserSchema,
        raw_message: CreateMessageSchema,
        message_service: MessageServiceDep,
        id_user_service: IdToUsernameServiceDep,
    ) -> None:
        """Send message to redis, it will be send to all users in chat"""

        # we get data and add username to it
        message = await message_service.create(raw_message)

        username_db = await id_user_service.get(message.user_id)

        if not username_db:
            username_db = await id_user_service.create(
                CreateIdToUsernameModelSchema(id=message.user_id, username=user.name)
            )

        # message.username = username_db.username

        # data_to_send = SendMessageSchema(data=message, chat_id=message.to_chat_id)

        # # send message to all users
        # await redis_client.publish(
        #     f"{ChannelsEnum.MESSAGES.value}:{message.to_chat_id}",
        #     data_to_send.model_dump_json(),
        # )

    # async def redis_subscriber_loop(self):
    #     """
    #     Handle redis message
    #     """

    #     async for raw_message in self._pubsub.listen():
    #         if raw_message["type"] != "message":
    #             continue

    #         try:
    #             message = SendMessageSchema.model_validate_json(raw_message["data"])
    #             await self.send_local_chat(message)
    #         except ValidationError as e:
    #             log.error(f"Error processing message: {e}")

    # async def send_local_chat(self, data: SendMessageSchema):
    #     """
    #     Every worker send message to all users in current chat
    #     """

    #     tasks = []

    #     # chat_id set when user connected
    #     for user_id in self.chats_connections[data.chat_id]:
    #         for connection in self.active_connections[user_id]:
    #             tasks.append(connection.send_text(data.model_dump_json()))

    #     await asyncio.gather(*tasks, return_exceptions=True)

    #     log.info("redis subscriber loop stopped")

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

        # if user connect from other device, we not remove it
        self.active_connections[user_id].remove(ws)
        if not self.active_connections[user_id]:
            del self.active_connections[user_id]


def get_connection_managet(redis: redis_storage):
    return ConnectionManager(redis)


ConnectionManagerDep = Annotated[ConnectionManager, Depends(get_connection_managet)]

__all__ = ["ConnectionManagerDep"]
