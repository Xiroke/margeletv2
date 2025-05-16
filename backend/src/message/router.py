from typing import Annotated
from uuid import UUID

from fastapi import (
    APIRouter,
    Body,
    Depends,
    Query,
    WebSocket,
    WebSocketDisconnect,
    WebSocketException,
)
from fastapi.responses import JSONResponse
from fastapi_users.authentication import JWTStrategy
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.users import (
    current_active_user,
    get_jwt_strategy,
    get_user_db,
    get_user_manager,
)
from src.db.dao import ChatDAO
from src.db.database import get_async_session
from src.db.models import UserModel

from .dao import MessageDAO
from .id_to_username.dao import IdToUsernameDAO
from .no_sql_models import MessageModel
from .schemas import (
    CreateMessageSchema,
    ReadMessageSchema,
    RecivedDataDTO,
    UpdateMessageSchema,
)

router = APIRouter(prefix="/messages", tags=["messages"])


@router.get("/chat/{chat_id}")
async def get_all_messages_chat(
    user: Annotated[UserModel, Depends(current_active_user)], chat_id: UUID
) -> list[ReadMessageSchema]:
    raw_messages = await MessageDAO.get_all_by_field(MessageModel.to_chat_id == chat_id)

    messages = []
    for message in raw_messages:
        message = ReadMessageSchema.model_validate(message)
        username_db = await IdToUsernameDAO.get_one_by_id(message.user_id)

        if not username_db:
            username_db = await IdToUsernameDAO.create(
                {"id": message.user_id, "username": user.name}
            )

        message.author = username_db.username
        messages.append(message)

    return messages


@router.get("/{message_id}")
async def get_message_by_id(
    message_id: UUID,
) -> ReadMessageSchema:
    return await MessageDAO.get_one_by_id(message_id)


@router.patch("/{message_id}")
async def update_message(
    message_id: int,
    message: Annotated[UpdateMessageSchema, Body()],
):
    """not work"""
    await MessageDAO.update(message.model_dump(exclude_none=True), id=message_id)

    return JSONResponse(status_code=200, content={"message": "Message updated"})


@router.delete("/{message_id}")
async def delete_message(
    message_id: int,
):
    await MessageDAO.delete(message_id)

    return JSONResponse(status_code=200, content={"message": "Message deleted"})


@router.post("/")
async def create_message(
    user: Annotated[UserModel, Depends(current_active_user)],
    message: Annotated[CreateMessageSchema, Body()],
):
    message.user_id = user.id
    new_message = await MessageDAO.create(message.model_dump())
    return new_message


class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[UUID, list[WebSocket]] = {}  # {user_id: ws}
        self.chats_connections: dict[
            UUID, list[UUID]
        ] = {}  # {chat_id: [user_id]}all online users in each chat

    async def connect(self, websocket: WebSocket, user_id: UUID, chats_id: list[UUID]):
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
    ):
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

    async def broadcast(self, user: UserModel, raw_message: CreateMessageSchema):
        """Send message to all users of current chat (from message)"""

        # --- we get data and add username to it
        message_db: MessageModel = await MessageDAO.create(raw_message.model_dump())

        message = ReadMessageSchema.model_validate(message_db)
        username_db = await IdToUsernameDAO.get_one_by_id(message.user_id)

        if not username_db:
            username_db = await IdToUsernameDAO.create(
                {"id": message.user_id, "username": user.name}
            )

        message.author = username_db.username
        # ---
        for user_id in self.chats_connections[message_db.to_chat_id]:
            for connection in self.active_connections[user_id]:
                print(connection)
                await connection.send_text(message.model_dump_json())


connection_manager_users = ConnectionManager()


@router.websocket("/")
async def websocket_endpoint(
    session: Annotated[AsyncSession, Depends(get_async_session)],
    jwt_strategy: Annotated[JWTStrategy, Depends(get_jwt_strategy)],
    websocket: WebSocket,
    access_token: Annotated[str, Query()],
):
    user_db = await anext(get_user_db(session))
    user_manager = await anext(get_user_manager(user_db))
    user: UserModel | None = await jwt_strategy.read_token(
        access_token,
        user_manager=user_manager,
    )

    if user is None:
        raise WebSocketException(401, "Unauthorized")

    chats_id = await ChatDAO.get_all_chats_by_user(session, user.id)
    await connection_manager_users.connect(websocket, user.id, chats_id)
    try:
        while True:
            data = RecivedDataDTO(**await websocket.receive_json())
            data.user_id = user.id
            await connection_manager_users.broadcast(user, data)

    except WebSocketDisconnect:
        print("disconnect")
        await connection_manager_users.disconnect(websocket, user.id, chats_id)
