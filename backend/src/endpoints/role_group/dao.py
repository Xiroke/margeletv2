from abc import ABC, abstractmethod
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.abstract.dao_base import DaoBase, SqlDaoBaseDefault
from src.endpoints.role_group.roles_group_user.models import RoleGroupToUserModel

from .models import RoleGroupModel


class RoleGroupDaoBase(DaoBase[RoleGroupModel], ABC):
    @abstractmethod
    async def get_user_group_roles(
        self, user_id: int | UUID, role_group_user_model: type[RoleGroupToUserModel]
    ):
        """get roles user in group"""
        pass


class RoleGroupSqlDao(SqlDaoBaseDefault[RoleGroupModel], RoleGroupDaoBase):
    model = RoleGroupModel

    def __init__(
        self,
        session: AsyncSession,
        model: type[RoleGroupModel],
    ):
        super().__init__(session, model)

    async def get_user_group_roles(
        self, user_id: int | UUID, role_group_user_model: type[RoleGroupToUserModel]
    ):
        query = (
            select(self.model)
            .join(
                role_group_user_model,
                self.model.id == role_group_user_model.role_group_id,
            )
            .where(role_group_user_model.user_id == user_id)
        )

        return await self.session.execute(query)
