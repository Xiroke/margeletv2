from typing import TYPE_CHECKING
from uuid import UUID

from src.utils.jwt import JWTManager

from .schemas import AccessTokenJWTSchema

if TYPE_CHECKING:
    from src.endpoints.user.dao import UserDaoBase


async def get_user_from_access(
    access_token: str, jwt_manager: JWTManager, UserDao: "UserDaoBase"
):
    token_data = AccessTokenJWTSchema.model_validate(jwt_manager.decode(access_token))
    return await UserDao.get_one_by_id(UUID(token_data.user_id))
