from typing import TYPE_CHECKING
from uuid import UUID

from src.core.abstract.permission_base import PermissionDaoBase
from src.endpoints.role.dao import RoleDaoBase
from src.utils.exeptions import PermissionGroupDeniedError


class RolePermission(PermissionDaoBase):
    def __init__(self, dao: RoleDaoBase):
        if TYPE_CHECKING:
            self.dao = dao

        super().__init__(dao)

    async def check_user_has_permission(
        self, permission: str | list[str], user_id: UUID, group_id: UUID
    ) -> None:
        roles = await self.dao.get_user_group_roles(user_id, group_id)
        array_permissions = {perm for role in roles for perm in role.permissions}

        if type(permission) is str:
            status = permission in array_permissions
            if not status:
                raise PermissionGroupDeniedError()
        else:
            status = all(elem in array_permissions for elem in permission)
            if not status:
                raise PermissionGroupDeniedError()
