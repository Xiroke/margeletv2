from typing import Annotated

from fastapi import Depends

from src.core.abstract.permission_base import PermissionService
from src.endpoints.user.depends import user_dao_factory


class UserPermission(PermissionService):
    pass


def get_user_permission(dao: user_dao_factory) -> UserPermission:
    return UserPermission(dao)


user_permission = Annotated[UserPermission, Depends(get_user_permission)]

__all__ = ["user_permission"]
