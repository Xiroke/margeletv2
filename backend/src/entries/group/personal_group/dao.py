from typing import Protocol, override
from uuid import UUID

from ..dao import GroupDaoProtocol, GroupSqlDao
from ..schemas import CreateGroupSchema, UpdateGroupSchema
from .models import PersonalGroupModel
from .schemas import ReadPersonalGroupSchema


class PersonalGroupDaoProtocol(GroupDaoProtocol, Protocol):
    @override
    async def create(
        self, obj: CreateGroupSchema, user_id: UUID
    ) -> ReadPersonalGroupSchema: ...


class PersonalGroupSqlDao(
    GroupSqlDao[
        PersonalGroupModel,
        UUID,
        ReadPersonalGroupSchema,
        CreateGroupSchema,
        UpdateGroupSchema,
    ]
):
    @override
    async def create(
        self, obj: CreateGroupSchema, user_id: UUID, other_user_id: UUID
    ) -> ReadPersonalGroupSchema:
        group = PersonalGroupModel(**obj.model_dump())
        self.session.add(group)
        await self.add_user_to_group(group.id, user_id)
        await self.add_user_to_group(group.id, other_user_id)
        await self.session.flush()
        return ReadPersonalGroupSchema.model_validate(group)
