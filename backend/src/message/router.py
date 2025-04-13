from fastapi import APIRouter, WebSocket, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated


from src.auth.users import (
    current_active_user,
    get_user_manager,
    get_user_db,
)
from src.db.database import get_async_session

router = APIRouter(prefix="/messages", tags=["messages"])


class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[int, WebSocket] = {}  # {user_id: [ws]}
        self.chats_id: dict[int, set[int]] = {}

    async def connect(self, websocket: WebSocket, user_id: int, chats_id: set[int]):
        await websocket.accept()

        if user_id not in self.active_connections.keys():
            self.active_connections[user_id] = websocket
            self.chats_id[user_id] = chats_id

    def disconnect(self, websocket, user_id: int):
        self.active_connections[user_id].remove(websocket)

    # async def broadcast(
    #     self,
    #     text: str,
    #     chat_id: int,
    #     access_token: str,
    #     session: AsyncSession,
    # ):
    #     user = await
    #     message = await MessageManager.create_message(
    #         session, user_id=user.id, chat_id=chat_id, text=text
    #     )

    #     data_message = MessageS(
    #         id=message.id,
    #         local_id=message.local_id,
    #         text=text,
    #         user_id=user.id,
    #         chat_id=chat_id,
    #         created_at=message.created_at,
    #     )
    #     data = MessageServerToClient(
    #         message=data_message,
    #         author_id=user.id,
    #         author_name=user.name,
    #     )
    #     for connection in self.active_connections[chat_id]:
    #         await connection.send_text(data.model_dump_json())


connection_manager_users = ConnectionManager()


@router.get("/api")
def ping():
    return "pong"


# @router.websocket("/{chat_id}")
# async def websocket_endpoint(
#     session: Annotated[AsyncSession, Depends(get_async_session)],
#     websocket: WebSocket,
#     chat_id: int,
#     token: Annotated[str | None, Query()] = None,
# ):
#     jwt_strategy = get_jwt_strategy()

#     user = await jwt_strategy.read_token(
#         token,
#         user_manager=await anext(get_user_manager(await anext(get_user_db(session)))),
#     )

#     await connection_manager_users.connect(websocket, user.id, {chat_id})
#     try:
#         while True:
#             text = await websocket.receive_text()
#             await connection_manager_users.broadcast(text, chat_id, token, session)

#     except WebSocketDisconnect:
#         connection_manager_users.disconnect(websocket, chat_id)
