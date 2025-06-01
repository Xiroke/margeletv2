from typing import TYPE_CHECKING
from uuid import UUID

from src.core.abstract.service_base import DaoService
from src.endpoints.role.models import RoleModel, RolePermissionsEnum
from src.endpoints.role.schemas import (
    CreateRoleSchema,
    ReadRoleSchema,
    UpdateRoleSchema,
)

from .dao import RoleDaoProtocol


class RoleService(
    DaoService[RoleModel, ReadRoleSchema, CreateRoleSchema, UpdateRoleSchema]
):
    def __init__(
        self,
        dao: RoleDaoProtocol,
    ):
        if TYPE_CHECKING:
            self.dao = dao

        super().__init__(dao)

    async def get_user_roles_in_group(
        self, user_id: UUID, group_id: UUID
    ) -> list[ReadRoleSchema]:
        return await self.dao.get_user_roles_in_group(user_id, group_id)

    async def get_user_permissions_in_group(
        self, user_id: UUID, group_id: UUID
    ) -> set[RolePermissionsEnum]:
        roles = await self.dao.get_user_roles_in_group(user_id, group_id)
        return {perm for role in roles for perm in role.permissions}
