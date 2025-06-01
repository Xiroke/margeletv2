import uuid
from typing import Annotated, AsyncGenerator, Optional

from fastapi import Depends, Request
from fastapi_users import BaseUserManager, FastAPIUsers, UUIDIDMixin
from fastapi_users.authentication import AuthenticationBackend, CookieTransport
from fastapi_users.db import SQLAlchemyUserDatabase

from config import settings
from src.endpoints.auth.refresh_token.dao import get_database_strategy
from src.endpoints.user.depends import get_user_db
from src.endpoints.user.models import UserModel

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


auth_backend = AuthenticationBackend(
    name="db_cookie",
    transport=cookie_transport,
    get_strategy=get_database_strategy,
)

fastapi_users = FastAPIUsers[UserModel, uuid.UUID](get_user_manager, [auth_backend])

fastapi_users_current_user = fastapi_users.current_user(active=True)
