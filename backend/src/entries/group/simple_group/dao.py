from typing import Protocol, override
from uuid import UUID

from src.core.abstract.dao.dao import DaoProtocol

from ..dao import GroupSqlDao
from ..schemas import CreateGroupSchema, UpdateGroupSchema
from .models import SimpleGroupModel
from .schemas import (
    CreateSimpleGroupSchema,
    ReadSimpleGroupSchema,
    UpdateSimpleGroupSchema,
)


class SimpleGroupDaoProtocol(
    DaoProtocol[
        SimpleGroupModel,
        UUID,
        ReadSimpleGroupSchema,
        CreateSimpleGroupSchema,
        UpdateSimpleGroupSchema,
    ],
    Protocol,
):
    pass


class SimpleGroupSqlDao(
    GroupSqlDao[
        SimpleGroupModel,
        UUID,
        ReadSimpleGroupSchema,
        CreateGroupSchema,
        UpdateGroupSchema,
    ],
):
    @override
    async def create(self, obj: CreateGroupSchema, user_id: UUID):
        group = SimpleGroupModel(**obj.model_dump())
        self.session.add(group)
        await self._set_admin_group(group.id, user_id)
        await self.session.flush()
        return ReadSimpleGroupSchema.model_validate(group)
