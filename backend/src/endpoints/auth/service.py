from uuid import UUID

from src.endpoints.user.dao import UserDaoProtocol
from src.utils.jwt import JWTManager

from .schemas import AccessTokenJWTSchema


async def get_user_from_access(
    access_token: str,
    jwt_manager_access: JWTManager[AccessTokenJWTSchema],
    UserDao: UserDaoProtocol,
):
    token_data = AccessTokenJWTSchema.model_validate(
        jwt_manager_access.decode(access_token)
    )
    return await UserDao.get_one_by_id(UUID(token_data.user_id))
