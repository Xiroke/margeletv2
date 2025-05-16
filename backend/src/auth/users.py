import uuid
from typing import Annotated, AsyncGenerator, Optional

from fastapi import Depends, Request
from fastapi_users import BaseUserManager, FastAPIUsers, UUIDIDMixin
from fastapi_users.authentication import (
    AuthenticationBackend,
    CookieTransport,
    JWTStrategy,
)
from fastapi_users.authentication.strategy.db import (
    AccessTokenDatabase,
    DatabaseStrategy,
)
from fastapi_users.db import SQLAlchemyUserDatabase

from config import settings
from src.db.models import UserModel
from src.refresh_token.dao import get_refresh_token_db
from src.refresh_token.models import TokenModel
from src.user.utils import get_user_db

SECRET = "SECRET"


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
        pass

    async def on_after_request_verify(
        self, user: UserModel, token: str, request: Optional[Request] = None
    ):
        print(f"Verification requested for user {user.id}. Verification token: {token}")


async def get_user_manager(
    user_db: Annotated[SQLAlchemyUserDatabase, Depends(get_user_db)],
) -> AsyncGenerator[UserManager, None]:
    yield UserManager(user_db)


cookie_transport = CookieTransport(
    cookie_name="refresh_token",
    cookie_max_age=60 * 60 * 24 * 24,
    cookie_httponly=settings.COOKIE_HTTPONLY,
    cookie_secure=settings.COOKIE_SECURE,
    cookie_samesite=settings.COOKIE_SAMESITE,
)


def get_database_strategy(
    access_token_db: Annotated[
        AccessTokenDatabase[TokenModel], Depends(get_refresh_token_db)
    ],
) -> DatabaseStrategy:
    return DatabaseStrategy(access_token_db, lifetime_seconds=60 * 60 * 24 * 24)


auth_backend = AuthenticationBackend(
    name="db_cookie",
    transport=cookie_transport,
    get_strategy=get_database_strategy,
)


def get_jwt_strategy() -> JWTStrategy:
    """jwt strategy used for generating access tokens"""
    return JWTStrategy(secret=SECRET, lifetime_seconds=3600)


fastapi_users = FastAPIUsers[UserModel, uuid.UUID](get_user_manager, [auth_backend])

current_active_user = fastapi_users.current_user(active=True)
