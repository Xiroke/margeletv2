from typing import Annotated

from fastapi import Depends
from src.endpoints.auth.service import get_user_from_access
from src.endpoints.auth.users import fastapi_users_current_user
from src.endpoints.user.depends import user_dao_factory
from src.endpoints.user.models import UserModel
from src.utils.depends import oauth2_scheme
from src.utils.jwt import jwt_manager

access_token = Annotated[str, Depends(oauth2_scheme)]


async def get_current_user_from_access(
    access_token: access_token, jwt: jwt_manager, dao: user_dao_factory
):
    return await get_user_from_access(access_token, jwt, dao)


current_user = Annotated[UserModel, Depends(get_current_user_from_access)]

current_user_from_refresh = Annotated[UserModel, Depends(fastapi_users_current_user)]


__all__ = ["current_user_from_refresh", "current_user", "get_current_user_from_access"]
