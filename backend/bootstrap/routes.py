# import routers must be after
from fastapi import FastAPI

from src.endpoints.auth.router import router as auth_router  # noqa: E402
from src.endpoints.auth.user.router import router as user_router  # noqa: E402


def register_routes(app: FastAPI):
    # In message_router there is a websocket route
    # /api/messages/{chat_id}?token=jwt
    app.include_router(prefix="/api", router=auth_router)
    # app.include_router(prefix="/api", router=group_router)
    app.include_router(prefix="/api", router=user_router)
    # app.include_router(prefix="/api", router=chat_router)
    # app.include_router(prefix="/api", router=role_router)
    # app.include_router(prefix="/api", router=message_router)
