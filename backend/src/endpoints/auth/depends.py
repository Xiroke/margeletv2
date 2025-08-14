from typing import Annotated

from fastapi import Depends

from config import settings
from src.endpoints.auth.schemas import AccessTokenJWTSchema
from src.endpoints.auth.service import get_user_from_access
from src.endpoints.auth.user.depends import user_dao_factory
from src.endpoints.auth.user.models import UserModel
from src.endpoints.auth.users import fastapi_users_current_user
from src.security.jwt import JWTManager
from src.utils.depends import oauth2_scheme

access_token = Annotated[str, Depends(oauth2_scheme)]


def get_jwt_manager_access() -> JWTManager[AccessTokenJWTSchema]:
    return JWTManager(
        settings.JWT_ACCESS_TOKEN_SECRET_KEY,
        AccessTokenJWTSchema,
        settings.JWT_ALGORITHM,
        settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES,
    )


jwt_manager_access = Annotated[
    JWTManager[AccessTokenJWTSchema], Depends(get_jwt_manager_access)
]


async def get_current_user_from_access(
    access_token: access_token, jwt: jwt_manager_access, dao: user_dao_factory
):
    return await get_user_from_access(access_token, jwt, dao)


current_user = Annotated[UserModel, Depends(get_current_user_from_access)]

current_user_from_refresh = Annotated[UserModel, Depends(fastapi_users_current_user)]


__all__ = [
    "current_user_from_refresh",
    "current_user",
    "get_current_user_from_access",
    "jwt_manager_access",
]
