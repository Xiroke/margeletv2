from logging import getLogger

from fastapi import APIRouter, WebSocket, WebSocketDisconnect, WebSocketException

from src.entries.auth.depends import (
    AuthServiceDep,
    JwtManagerAccess,
    get_current_user_from_access,
)
from src.entries.auth.user.depends import UserServiceDep
from src.entries.message.depends import MessageServiceDep
from src.entries.message.id_to_username.depends import IdToUsernameServiceDep
from src.entries.message.schemas import CreateMessageSchema
from src.entries.websocket.connection_manager import ConnectionManagerDep

log = getLogger(__name__)

router = APIRouter()


@router.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket,
    access_token: str,
    message_service: MessageServiceDep,
    jwt: JwtManagerAccess,
    user_service: UserServiceDep,
    id_to_username_service: IdToUsernameServiceDep,
    auth: AuthServiceDep,
    connection_manager: ConnectionManagerDep,
):
    user = await get_current_user_from_access(access_token, auth)

    if user is None:
        raise WebSocketException(401, "Unauthorized")

    await connection_manager.connect(websocket, user.id)

    log.debug("WS connected user %s", user.id)
    try:
        while True:
            data_raw = await websocket.receive_json()
            data = CreateMessageSchema.model_validate(data_raw)
            data.user_id = user.id
            # await ConnectionManagerDep.broadcast(
            #     user, data, message_service, id_to_username_service
            # )

    except WebSocketDisconnect:
        await connection_manager.disconnect(websocket, user.id)
