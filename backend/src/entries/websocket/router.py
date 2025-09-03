from logging import getLogger

from fastapi import APIRouter, WebSocket, WebSocketDisconnect, WebSocketException

from src.entries.auth.depends import AuthServiceDep, get_current_user_from_access
from src.entries.message.depends import MessageServiceDep
from src.entries.message.schemas import CreateMessageSchema
from src.entries.websocket.connection_manager import ConnectionManagerDep
from src.entries.websocket.schemas import WsDataEvent, WsInDataSchema

log = getLogger(__name__)

router = APIRouter()


@router.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket,
    access_token: str,
    message_service: MessageServiceDep,
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
            json_websocket_data = await websocket.receive_json()
            websocket_data = WsInDataSchema.model_validate(json_websocket_data)

            match websocket_data.event:
                case WsDataEvent.MESSAGE:
                    message = CreateMessageSchema(
                        **websocket_data.data.model_dump(), user_id=user.id
                    )

                    await connection_manager.broadcast_group_message(
                        message,
                        message_service,
                    )

    except WebSocketDisconnect:
        await connection_manager.disconnect(websocket, user.id)
