from uuid import UUID

from src.core.abstract.service.service_base import Service
from src.endpoints.auth.refresh_token.dao import RefreshTokenDaoProtocol
from src.endpoints.auth.refresh_token.schemas import CreateRefreshTokenSchema
from src.security.jwt import JWTManager
from src.security.key_gen import generate_random_key
from src.security.password_helper import PasswordHelperDep
from src.utils.exceptions import HTTPAuthenticationException

from .schemas import AccessTokenJWTSchema
from .user.dao import UserDaoProtocol
from .user.schemas import CreateUserSchema, LoginUserSchema, ReadUserSchema


class AuthService(Service):
    def __init__(
        self,
        jwt_manager_access: JWTManager[AccessTokenJWTSchema],
        user_dao: UserDaoProtocol,
        refresh_token_dao: RefreshTokenDaoProtocol,
        hasher: PasswordHelperDep,
    ):
        self.jwt_manager_access = jwt_manager_access
        self.user_dao = user_dao
        self.refresh_token_dao = refresh_token_dao
        self.hasher = hasher

    async def get_user_from_access(
        self,
        access_token: str,
    ) -> ReadUserSchema:
        try:
            token_data = AccessTokenJWTSchema.model_validate(
                self.jwt_manager_access.decode(access_token)
            )
            return await self.user_dao.get(UUID(token_data.user_id))
        except Exception:
            raise HTTPAuthenticationException()

    async def get_access_from_refresh(self, refresh_token: str):
        user = await self.user_dao.get_user_by_token(refresh_token)
        payload = AccessTokenJWTSchema(user_id=str(user.id))
        token = self.jwt_manager_access.encode(payload)
        return {"access_token": token, "token_type": "bearer"}

    async def register(self, data: CreateUserSchema):
        """Create new user"""
        hashed_password = self.hasher.hash(data.password)
        # model_copy for replace the raw password to hashed
        await self.user_dao.create(
            data.model_copy(update={"password": hashed_password})
        )

    async def login(self, data: LoginUserSchema):
        user = await self.user_dao.get_user_for_check_password(data.email)

        if not user:
            raise HTTPAuthenticationException

        self.hasher.verify(data.password, user.hashed_password)

        generated_key = generate_random_key()

        refresh_token_validated = CreateRefreshTokenSchema(
            value=generated_key, user_id=str(user.id)
        )
        refresh_token = await self.refresh_token_dao.create(refresh_token_validated)

        return refresh_token
