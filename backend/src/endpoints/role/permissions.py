from typing import Annotated
from uuid import UUID

from fastapi import Depends

from src.core.abstract.permission_base import PermissionService
from src.endpoints.role.depends import RoleServiceDep
from src.endpoints.role.models import RolePermissionsEnum
from src.endpoints.role.service import RoleService
from src.utils.exceptions import ModelNotFoundException, PermissionGroupDeniedException


class RolePermission(PermissionService):
    def __init__(self, service: RoleService, role_service: RoleService):
        super().__init__(service)
        self.role_service = role_service

    async def check_user_has_permission(
        self,
        permission: RolePermissionsEnum | list[RolePermissionsEnum],
        user_id: UUID,
        group_id: UUID,
    ) -> None:
        # if you use this funct you must set dao
        assert self.role_service

        try:
            roles = await self.role_service.get_user_roles_in_group(user_id, group_id)
        except ModelNotFoundException:
            raise PermissionGroupDeniedException()

        array_permissions = {perm for role in roles for perm in role.permissions}

        if isinstance(permission, RolePermissionsEnum):
            status = permission in array_permissions
        else:
            status = all(elem in array_permissions for elem in permission)

        if not status:
            raise PermissionGroupDeniedException()


def get_role_permission(service: RoleServiceDep, role_service: RoleServiceDep):
    return RolePermission(service, role_service)


role_permission = Annotated[RolePermission, Depends(get_role_permission)]

__all__ = ["role_permission"]
