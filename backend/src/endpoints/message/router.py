from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Query, WebSocket, WebSocketDisconnect, WebSocketException

from src.endpoints.auth.depends import (
    current_user,
    get_current_user_from_access,
    jwt_manager_access,
)
from src.endpoints.chat.depends import chat_service_factory
from src.endpoints.group.permissions import group_permission
from src.endpoints.message.id_to_username.depends import id_to_username_dao
from src.endpoints.message.id_to_username.schemas import CreateIdToUsernameModelSchema
from src.endpoints.user.depends import user_dao_factory
from src.endpoints.user.schemas import ReadUserSchema
from src.utils.exceptions import ModelNotFoundException

from .depends import message_service_factory
from .models import MessageModel
from .schemas import CreateMessageSchema, ReadMessageSchema, SendMessageSchema

router = APIRouter(prefix="/messages", tags=["messages"])


@router.get("/chat/{chat_id}")
async def get_all_messages_chat(
    user: current_user,
    chat_id: UUID,
    message_service: message_service_factory,
    chat_service: chat_service_factory,
    id_user_dao: id_to_username_dao,
    group_perm: group_permission,
) -> list[ReadMessageSchema]:
    chat_db = await chat_service.get_one_by_id(chat_id)

    await group_perm.check_user_in_group(user.id, chat_db.group_id)

    raw_messages = await message_service.get_many_by_field(
        MessageModel.to_chat_id == chat_id
    )

    messages: list[ReadMessageSchema] = []
    for message in raw_messages:
        message = ReadMessageSchema.model_validate(message)

        try:
            username_db = await id_user_dao.get_one_by_id(message.user_id)
        except ModelNotFoundException:
            username_db = await id_user_dao.create(
                CreateIdToUsernameModelSchema(id=message.user_id, username=user.name)
            )

        message.author = username_db.username
        messages.append(message)

    return messages


class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[UUID, list[WebSocket]] = {}  # {user_id: ws}
        self.chats_connections: dict[
            UUID, list[UUID]
        ] = {}  # {chat_id: [user_id]}all online users in each chat

    async def connect(
        self, websocket: WebSocket, user_id: UUID, chats_id: list[UUID]
    ) -> None:
        """Connect user"""
        if self.active_connections.get(user_id) is None:
            self.active_connections[user_id] = []

        await websocket.accept()
        self.active_connections[user_id].append(websocket)

        for chat_id in chats_id:
            if self.chats_connections.get(chat_id) is None:
                self.chats_connections[chat_id] = []

            if user_id not in self.chats_connections[chat_id]:
                self.chats_connections[chat_id].append(user_id)

    async def disconnect(
        self,
        ws: WebSocket,
        user_id: UUID,
        chats_id: list[UUID],
    ) -> None:
        """Disconnect user"""
        if user_id not in self.active_connections.keys():
            return

        try:
            # raise exception if user is already disconnected
            await ws.close()
        except RuntimeError:
            pass

        del self.active_connections[user_id]
        for chat_id in chats_id:
            try:
                self.chats_connections[chat_id].remove(user_id)
            # TODO FIX IT
            except Exception:
                pass

    async def broadcast(
        self,
        user: ReadUserSchema,
        raw_message: CreateMessageSchema,
        message_service: message_service_factory,
        id_user_dao: id_to_username_dao,
    ) -> None:
        """Send message to all users of current chat (from message)"""

        # we get data and add username to it
        message = await message_service.create(raw_message)

        username_db = await id_user_dao.get_one_by_id(message.user_id)

        if not username_db:
            username_db = await id_user_dao.create(
                CreateIdToUsernameModelSchema(id=message.user_id, username=user.name)
            )

        message.author = username_db.username

        data_to_send = SendMessageSchema(data=message, chat_id=message.to_chat_id)

        # send message to all users
        for user_id in self.chats_connections[message.to_chat_id]:
            for connection in self.active_connections[user_id]:
                await connection.send_text(data_to_send.model_dump_json())


connection_manager_users = ConnectionManager()


@router.websocket("/")
async def websocket_endpoint(
    websocket: WebSocket,
    access_token: Annotated[str, Query()],
    message_service: message_service_factory,
    chat_service: chat_service_factory,
    jwt: jwt_manager_access,
    user_dao: user_dao_factory,
    id_user_dao: id_to_username_dao,
):
    user = await get_current_user_from_access(access_token, jwt, user_dao)

    if user is None:
        raise WebSocketException(401, "Unauthorized")

    chats = await chat_service.get_chats_by_user(user.id)
    chats_id = [i.id for i in chats]
    await connection_manager_users.connect(websocket, user.id, chats_id)
    try:
        while True:
            data_raw = await websocket.receive_json()
            data = CreateMessageSchema.model_validate(data_raw)
            data.user_id = user.id
            await connection_manager_users.broadcast(
                user, data, message_service, id_user_dao
            )

    except WebSocketDisconnect:
        await connection_manager_users.disconnect(websocket, user.id, chats_id)
