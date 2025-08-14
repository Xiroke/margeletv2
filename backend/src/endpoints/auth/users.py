import logging
import uuid
from typing import Annotated, AsyncGenerator, Optional

from fastapi import Depends, Request
from fastapi_users import BaseUserManager, FastAPIUsers, UUIDIDMixin
from fastapi_users.authentication import AuthenticationBackend, CookieTransport
from fastapi_users.db import BaseUserDatabase, SQLAlchemyUserDatabase
from fastapi_users.password import PasswordHelperProtocol

from config import settings
from src.endpoints.auth.refresh_token.dao import get_database_strategy
from src.endpoints.auth.user.depends import get_user_db
from src.endpoints.auth.user.models import UserModel
from src.infrastructure.smtp.depends import SMTPEmail, smtp_dep

log = logging.getLogger(__name__)


class UserManager(UUIDIDMixin, BaseUserManager[UserModel, uuid.UUID]):
    reset_password_token_secret = settings.secrets.RESET_PASSWORD_TOKEN
    verification_token_secret = settings.secrets.VERIFICATION_TOKEN

    def __init__(
        self,
        smtp: SMTPEmail,
        user_db: BaseUserDatabase[UserModel, uuid.UUID],
        password_helper: PasswordHelperProtocol | None = None,
    ):
        self.smtp = smtp
        super().__init__(user_db, password_helper)

    async def on_after_register(
        self, user: UserModel, request: Optional[Request] = None
    ):
        log.debug("User %s has registered", user.id)
        await self.request_verify(user, request)

    async def on_after_forgot_password(
        self, user: UserModel, token: str, request: Optional[Request] = None
    ):
        print(f"User {user.id} has forgot their password. Reset token: {token}")

    async def on_after_login(self, user, request, response):
        log.debug("User %s has logined", user.id)

    async def on_after_request_verify(
        self, user: UserModel, token: str, request: Optional[Request] = None
    ):
        log.debug("User %s request verify their email.", user.id)
        frontend_url_verify: str = f"{settings.FRONTEND_URL}/verify/{token}"
        await self.smtp.send(
            user.email,
            "Верификация email",
            f"Перейдите по ссылке для верификации {frontend_url_verify}",
        )


async def get_user_manager(
    user_db: Annotated[SQLAlchemyUserDatabase, Depends(get_user_db)], smtp: smtp_dep
) -> AsyncGenerator[UserManager, None]:
    yield UserManager(smtp, user_db)


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
