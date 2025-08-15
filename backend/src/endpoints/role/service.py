from typing import TYPE_CHECKING
from uuid import UUID

from src.core.abstract.service import DaoService
from src.endpoints.role.models import RolePermissionsEnum

from .dao import RoleDaoProtocol


class RoleService(DaoService):
    def __init__(
        self,
        dao: RoleDaoProtocol,
    ):
        if TYPE_CHECKING:
            self.dao = dao

        super().__init__(dao)

    async def get_user_permissions_in_group(
        self, user_id: UUID, group_id: UUID
    ) -> set[RolePermissionsEnum]:
        roles = await self.dao.get_user_roles_in_group(user_id, group_id)
        return {perm for role in roles for perm in role.permissions}
