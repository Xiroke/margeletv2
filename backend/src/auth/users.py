import uuid
from typing import Optional, Annotated
from datetime import timezone, datetime, timedelta

from fastapi import Depends, Request
from fastapi_users import BaseUserManager, FastAPIUsers, UUIDIDMixin
from fastapi_users.authentication import (
    AuthenticationBackend,
    BearerTransport,
    JWTStrategy,
)
from fastapi_users.db import SQLAlchemyUserDatabase

from src.user.utils import get_user_db
from src.db.models import UserModel
from src.db.database import get_async_session
from src.token.dao import TokenDAO
from src.token.models import TokenModel


SECRET = "SECRET"


async def create_refresh_token(user) -> str:
    return await get_jwt_strategy().write_token(user)


class UserManager(UUIDIDMixin, BaseUserManager[UserModel, uuid.UUID]):
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    async def on_after_register(
        self, user: UserModel, request: Optional[Request] = None
    ):
        print(f"User {user.id} has registered.")

    async def on_after_forgot_password(
        self, user: UserModel, token: str, request: Optional[Request] = None
    ):
        print(f"User {user.id} has forgot their password. Reset token: {token}")

    async def on_after_login(self, user, request, response):
        refresh_token = await create_refresh_token(user)
        token_db = TokenModel(user_id=user.id, value=refresh_token)

        await TokenDAO.create(session=await anext(get_async_session()), obj=token_db)

        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            expires=datetime.now(timezone.utc) + timedelta(days=24),
            httponly=True,
            secure=False,
            samesite="strict",
        )

    async def on_after_request_verify(
        self, user: UserModel, token: str, request: Optional[Request] = None
    ):
        print(f"Verification requested for user {user.id}. Verification token: {token}")


async def get_user_manager(
    user_db: Annotated[SQLAlchemyUserDatabase, Depends(get_user_db)],
):
    yield UserManager(user_db)


bearer_transport = BearerTransport(tokenUrl="auth/jwt/login")


def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=SECRET, lifetime_seconds=86400)


auth_backend = AuthenticationBackend(
    name="jwt",
    transport=bearer_transport,
    get_strategy=get_jwt_strategy,
)

fastapi_users = FastAPIUsers[UserModel, uuid.UUID](get_user_manager, [auth_backend])

current_active_user = fastapi_users.current_user(active=True)
