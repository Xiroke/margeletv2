from uuid import UUID

from src.security.jwt import JWTManager
from src.utils.exceptions import HTTPAuthenticationException

from .schemas import AccessTokenJWTSchema
from .user.dao import UserDaoProtocol
from .user.schemas import ReadUserSchema


async def get_user_from_access(
    access_token: str,
    jwt_manager_access: JWTManager[AccessTokenJWTSchema],
    UserDao: UserDaoProtocol,
) -> ReadUserSchema:
    try:
        token_data = AccessTokenJWTSchema.model_validate(
            jwt_manager_access.decode(access_token)
        )
        return await UserDao.get_one_by_id(UUID(token_data.user_id))
    except Exception:
        raise HTTPAuthenticationException()
