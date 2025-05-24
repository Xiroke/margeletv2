from typing import TYPE_CHECKING
from uuid import UUID

from src.core.abstract.permission_base import PermissionDaoBase
from src.core.abstract.service_base import DaoBaseService

from .dao import RoleGroupDaoBase
from .models import RoleGroupModel
from .roles_group_user.models import RoleGroupToUserModel


class RoleGroupService(DaoBaseService[RoleGroupModel]):
    def __init__(
        self,
        dao: RoleGroupDaoBase,
        permission: PermissionDaoBase,
    ):
        self.permission = permission

        if TYPE_CHECKING:
            self.dao = dao

        super().__init__(dao, permission)

    async def get_user_group_roles(self, user_id: int | UUID):
        return self.dao.get_user_group_roles(user_id, RoleGroupToUserModel)
