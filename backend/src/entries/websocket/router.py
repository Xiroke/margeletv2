from logging import getLogger

from fastapi import APIRouter, WebSocket, WebSocketDisconnect, WebSocketException

from src.entries.auth.depends import AuthServiceDep
from src.entries.group.group.depends import GroupServiceDep
from src.entries.message.depends import MessageServiceDep
from src.entries.websocket.connection_manager import ConnectionManagerDep
from src.entries.websocket.schemas import WsEventCreate

log = getLogger(__name__)

router = APIRouter()


@router.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket,
    ws_token: str,
    message_service: MessageServiceDep,
    group_service: GroupServiceDep,
    auth: AuthServiceDep,
    connection_manager: ConnectionManagerDep,
):
    user = await auth.get_user_from_ws(ws_token)

    if user is None:
        raise WebSocketException(401, "Unauthorized")

    await connection_manager.connect(websocket, user.id)

    log.debug("WS connected user %s", user.id)
    try:
        while True:
            json_websocket_data = await websocket.receive_json()
            log.debug("ws accepted data %s", json_websocket_data)
            websocket_data = WsEventCreate.model_validate(json_websocket_data)

            await connection_manager.broadcast_group_message(
                websocket_data,
                user.id,
                message_service,
                group_service,
            )

    except WebSocketDisconnect:
        await connection_manager.disconnect(websocket, user.id)
