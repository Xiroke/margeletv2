from uuid import UUID

from fastapi import APIRouter, Body, WebSocket, Depends, Query, WebSocketDisconnect
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated
from fastapi_users.authentication import JWTStrategy


from src.auth.users import (
    get_jwt_strategy,
    current_active_user,
    get_user_manager,
    get_user_db,
)
from src.db.database import get_async_session
from src.db.dao import ChatDAO
from .dao import MessageDAO
from .no_sql_models import MessageModel
from .schemas import (
    ReadMessageSchema,
    UpdateMessageSchema,
    CreateMessageSchema,
    RecivedDataDTO,
)


router = APIRouter(prefix="/messages", tags=["messages"])


@router.get("/{message_id}")
async def get_message_by_id(
    message_id: UUID,
):
    return await MessageDAO.get_one_by_id(message_id)


@router.patch("/{message_id}")
async def update_message(
    message_id: int,
    message: Annotated[MessageModel, Body()],
):
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
    message: Annotated[CreateMessageSchema, Body()],
):
    new_message = await MessageDAO.create(message.model_dump(exclude_none=True))
    return new_message


class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[UUID, WebSocket] = {}  # {user_id: ws}
        self.chats_connections: dict[
            UUID, dict[UUID]
        ] = {}  # {chat_id: [user_id]}all online users in each chat

    async def connect(self, websocket: WebSocket, user_id: int, chats_id: list[int]):
        await websocket.accept()
        self.active_connections[user_id] = websocket

        for chat_id in chats_id:
            if chat_id in self.chats_connections.keys():
                self.chats_connections[chat_id].append(user_id)
            else:
                self.chats_connections[chat_id] = [user_id]

    def disconnect(self, user_id: int, chats_id: list[int]):
        del self.active_connections[user_id]
        for chat_id in chats_id:
            self.chats_connections[chat_id].remove(user_id)

    async def broadcast(self, message: CreateMessageSchema):
        message_db: MessageModel = await MessageDAO.create(message.model_dump())
        print(self.chats_connections)
        for user_id in self.chats_connections[message_db.to_chat_id]:
            await self.active_connections[user_id].send_text(
                message_db.model_dump_json()
            )


connection_manager_users = ConnectionManager()


@router.get("/api")
def ping():
    return "pong"


@router.websocket("/")
async def websocket_endpoint(
    session: Annotated[AsyncSession, Depends(get_async_session)],
    jwt_strategy: Annotated[JWTStrategy, Depends(get_jwt_strategy)],
    websocket: WebSocket,
    token: Annotated[str, Query()],
):
    user = await jwt_strategy.read_token(
        token,
        user_manager=await anext(get_user_manager(await anext(get_user_db(session)))),
    )

    chats_id = await ChatDAO.get_all_chats_by_user(session, user.id)

    await connection_manager_users.connect(websocket, user.id, chats_id)
    try:
        while True:
            data = RecivedDataDTO(**await websocket.receive_json())
            await connection_manager_users.broadcast(data)

    except WebSocketDisconnect:
        connection_manager_users.disconnect(websocket, user.id, chats_id)
