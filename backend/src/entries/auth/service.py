from datetime import datetime, timedelta, timezone
from logging import getLogger
from uuid import UUID

from pydantic import EmailStr

from src.entries.auth.refresh_token.dao import RefreshTokenDaoProtocol
from src.entries.auth.refresh_token.schemas import RefreshTokenCreate
from src.infrastructure.smtp import SMTP
from src.security.jwt import JWTManager
from src.security.key_gen import generate_random_key
from src.security.password_helper import PasswordHelperDep
from src.utils.exceptions import (
    HTTPAuthenticationBannedException,
    HTTPAuthenticationException,
    HTTPAuthenticationNotVerifiedException,
)

from .schemas import AccessTokenJWT, AccessTokenRead, VerificationTokenJWT
from .user.dao import UserDaoProtocol
from .user.schemas import UserCreate, UserLogin, UserRead

log = getLogger(__name__)


class AuthService:
    def __init__(
        self,
        jwt_manager_access: JWTManager[AccessTokenJWT],
        jwt_manager_verification: JWTManager[VerificationTokenJWT],
        user_dao: UserDaoProtocol,
        refresh_token_dao: RefreshTokenDaoProtocol,
        hasher: PasswordHelperDep,
        smtp: SMTP,
    ):
        self.jwt_manager_access = jwt_manager_access
        self.jwt_manager_verification = jwt_manager_verification
        self.user_dao = user_dao
        self.refresh_token_dao = refresh_token_dao
        self.hasher = hasher
        self.smtp = smtp

    async def get_user_from_access(
        self,
        access_token: str,
    ) -> UserRead:
        try:
            token_data = AccessTokenJWT.model_validate(
                self.jwt_manager_access.decode(access_token)
            )
            user = await self.user_dao.get(id=UUID(token_data.user_id))
        except Exception:
            raise HTTPAuthenticationException

        if not user.is_active:
            raise HTTPAuthenticationBannedException

        elif not user.is_verified:
            raise HTTPAuthenticationNotVerifiedException

        return user

    async def get_access_from_refresh(self, refresh_token: str) -> AccessTokenRead:
        user = await self.user_dao.get_user_by_token(refresh_token)

        if not user.is_active:
            raise HTTPAuthenticationBannedException

        elif not user.is_verified:
            raise HTTPAuthenticationNotVerifiedException

        payload = AccessTokenJWT(user_id=str(user.id))

        token = self.jwt_manager_access.encode(payload)
        return AccessTokenRead(access_token=token, token_type="bearer")

    async def get_current_user_from_refresh(self, refresh_token: str):
        return await self.user_dao.get_user_by_token(refresh_token)

    async def register(self, data: UserCreate):
        """Create new user"""
        hashed_password = self.hasher.hash(data.password)

        # model_copy for replace the raw password to hashed
        user = await self.user_dao.create(
            data.model_copy(update={"password": hashed_password}), returning=True
        )

        payload = VerificationTokenJWT(user_id=str(user.id))
        token = self.jwt_manager_verification.encode(payload)
        await self.smtp.send("Verefication code", f"{user.email}", f"{token}")

    async def login(self, data: UserLogin):
        """Create refresh token for user"""
        log.debug("Login attempt by user %s", data.email)
        user = await self.user_dao.get_user_for_check_password(data.email)

        if not user.is_active:
            raise HTTPAuthenticationBannedException

        elif not user.is_verified:
            raise HTTPAuthenticationNotVerifiedException

        if not user:
            raise HTTPAuthenticationException

        self.hasher.verify(data.password, user.password)

        generated_key = generate_random_key()
        expired_at = datetime.now(timezone.utc) + timedelta(
            minutes=self.jwt_manager_access.expiration_minutes
        )

        refresh_token_validated = RefreshTokenCreate(
            value=generated_key, user_id=str(user.id), expired_at=expired_at
        )
        log.debug("Generate refresh token for %s", data.email)
        refresh_token = await self.refresh_token_dao.create(
            refresh_token_validated, returning=True
        )

        return refresh_token

    async def resend_verification(
        self,
        email: EmailStr,
    ):
        user = await self.user_dao.get_user_by_email(email)

        payload = VerificationTokenJWT(user_id=str(user.id))
        token = self.jwt_manager_verification.encode(payload)
        await self.smtp.send("Verefication code", f"{user.email}", f"{token}")

    async def verify(self, token: str):
        payload = self.jwt_manager_verification.decode(token)

        await self.user_dao.set_is_verified(UUID(payload.user_id), True)
