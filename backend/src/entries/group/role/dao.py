from typing import Protocol
from uuid import UUID

from sqlalchemy import select

from src.core.abstract.dao import DaoProtocol, SqlDaoImpl
from src.entries.group.group.models import UserToGroupModel

from .models import RoleModel
from .schemas import RoleCreate, RoleRead, RoleUpdate


class RoleDaoProtocol(
    DaoProtocol[RoleModel, int, RoleRead, RoleCreate, RoleUpdate],
    Protocol,
):
    async def get_in_group(self, title: str, group_id: UUID) -> RoleRead: ...


class RoleSqlDao(SqlDaoImpl[RoleModel, int, RoleRead, RoleCreate, RoleUpdate]):
    async def get_in_group(self, title: str, group_id: UUID) -> RoleRead:
        stmt = (
            select(RoleModel)
            .join(UserToGroupModel, UserToGroupModel.group_id == group_id)
            .filter(
                RoleModel.title == title,
            )
        )
        result = await self.session.execute(stmt)
        return self._model_to_read_schema(result.scalars().first())
