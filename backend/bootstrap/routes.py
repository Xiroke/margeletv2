# import routers must be after
from fastapi import FastAPI

from src.endpoints.auth.router import router as auth_router
from src.endpoints.auth.user.router import router as user_router

# from src.endpoints.group.router import router as group_router
# from src.endpoints.message.router import router as message_router
# from src.endpoints.role.router import router as role_router


def register_routes(app: FastAPI):
    app.include_router(prefix="/api", router=auth_router)
    app.include_router(prefix="/api", router=user_router)
    # app.include_router(prefix="/api", router=group_router)
    # app.include_router(prefix="/api", router=role_router)
    # app.include_router(prefix="/api", router=message_router)
