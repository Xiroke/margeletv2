from typing import TYPE_CHECKING
from uuid import UUID

from src.core.abstract.service_base import DaoBaseService
from src.endpoints.role.permissions import RolePermission

from .dao import RoleDaoBase
from .models import RoleModel


class RoleService(DaoBaseService[RoleModel]):
    def __init__(
        self,
        dao: RoleDaoBase,
    ):
        self.permission = RolePermission(dao)

        if TYPE_CHECKING:
            self.dao = dao

        super().__init__(dao)

    async def get_user_group_roles(
        self,
        user_id: UUID,
        group_id: UUID,
    ):
        return await self.dao.get_user_group_roles(user_id, group_id)

    async def get_user_group_permissions(
        self, user_id: UUID, group_id: UUID
    ) -> list[str]:
        array = []
        for role in await self.get_user_group_roles(user_id, group_id):
            for permission in role.permissions:
                array.append(permission)
        return array
