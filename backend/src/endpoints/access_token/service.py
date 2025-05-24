from datetime import datetime, timezone
from uuid import UUID

from fastapi import HTTPException, Request, Response

from config import settings
from src.endpoints.role_group.models import RoleGroupModel
from src.endpoints.role_group.service import RoleGroupService
from src.utils.jwt import UserJWTManager, UserJWTSchema


def read_access_token_cookie(request: Request, user_jwt_manager: UserJWTManager):
    """get access token from cookie"""
    access_token = request.cookies.get("access_token")
    if not access_token:
        raise HTTPException(status_code=401, detail="Access token not found")

    return user_jwt_manager.decode(access_token)


async def write_access_token_cookie(
    response: Response,
    user_id: UUID | int,
    user_jwt_manager: UserJWTManager,
    roles_group_service: RoleGroupService,
) -> str:
    """write token in cookie"""
    roles_group_db = await roles_group_service.get_many_by_field(RoleGroupModel)
    # roles = await roles_group_service.get_user_group_permissions
    token_data = UserJWTSchema(user_id=user_id)
    access_token = user_jwt_manager.encode(token_data)

    response.set_cookie(
        key="access_token",
        value=access_token,
        expires=datetime.now(timezone.utc),
        httponly=settings.COOKIE_HTTPONLY,
        secure=settings.COOKIE_SECURE,
        samesite=settings.COOKIE_SAMESITE,
    )

    return access_token
