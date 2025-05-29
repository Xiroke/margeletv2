from abc import ABC, abstractmethod
from uuid import UUID

from sqlalchemy import and_, select
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.abstract.dao_base import DaoBase, SqlDaoBaseDefault

from .models import RoleModel
from .user_role.models import UserToRoleModel


class RoleDaoBase[T](DaoBase[T], ABC):
    @abstractmethod
    async def get_user_group_roles(
        self,
        user_id: UUID,
        group_id: UUID,
    ) -> list[T]:
        """get roles user in group"""
        pass


class RoleSqlDao(SqlDaoBaseDefault[RoleModel], RoleDaoBase[RoleModel]):
    def __init__(
        self,
        session: AsyncSession,
    ):
        super().__init__(session, RoleModel)

    async def get_user_group_roles(
        self,
        user_id: UUID,
        group_id: UUID,
    ) -> list[RoleModel]:
        query = (
            select(self.model)
            .join(
                UserToRoleModel,
                self.model.id == UserToRoleModel.role_id,
            )
            .where(
                and_(
                    self.model.group_id == group_id,
                    UserToRoleModel.user_id == user_id,
                )
            )
        )

        result = await self.session.execute(query)
        return list(result.scalars().all())
