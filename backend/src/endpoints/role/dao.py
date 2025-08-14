from typing import Protocol
from uuid import UUID

from sqlalchemy import select

from src.core.abstract.dao import DaoProtocol, SqlDaoImpl
from src.core.db.models.secondary_models.models import UserToGroupModel
from src.endpoints.role.models import RoleModel
from src.endpoints.role.schemas import (
    CreateRoleSchema,
    ReadRoleSchema,
    UpdateRoleSchema,
)


class RoleDaoProtocol(
    DaoProtocol[int, RoleModel, ReadRoleSchema, CreateRoleSchema, UpdateRoleSchema],
    Protocol,
):
    async def get_user_roles_in_group(
        self, user_id: UUID, group_id: UUID
    ) -> list[ReadRoleSchema]: ...


class RoleSqlDao(
    SqlDaoImpl[int, RoleModel, ReadRoleSchema, CreateRoleSchema, UpdateRoleSchema]
):
    async def get_user_roles_in_group(
        self, user_id: UUID, group_id: UUID
    ) -> list[ReadRoleSchema]:
        result = await self.session.execute(
            select(RoleModel)
            .join(UserToGroupModel, UserToGroupModel.c.user_id == user_id)
            .filter(RoleModel.group_id == group_id)
        )
        return [ReadRoleSchema.model_validate(i) for i in result.scalars().all()]
