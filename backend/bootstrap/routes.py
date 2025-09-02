# import routers must be after
from fastapi import FastAPI

from src.entries.auth.router import router as auth_router
from src.entries.auth.user.router import router as user_router
from src.entries.group.personal_group.router import router as personal_group_router
from src.entries.group.role.router import router as role_router
from src.entries.group.router import router as group_router
from src.entries.group.simple_group.router import router as simple_group_router
from src.entries.message.router import router as message_router
from src.entries.websocket.router import router as websocket_router


def register_routes(app: FastAPI):
    app.include_router(prefix="/api", router=auth_router)
    app.include_router(prefix="/api", router=websocket_router)
    app.include_router(prefix="/api", router=user_router)
    app.include_router(prefix="/api", router=personal_group_router)
    app.include_router(prefix="/api", router=simple_group_router)
    app.include_router(prefix="/api", router=role_router)
    app.include_router(prefix="/api", router=group_router)
    app.include_router(prefix="/api", router=message_router)
