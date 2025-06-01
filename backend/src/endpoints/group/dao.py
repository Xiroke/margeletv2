from typing import Protocol, override
from uuid import UUID

from sqlalchemy import and_, insert, select

from src.core.abstract.dao_base import DaoProtocol, SqlDaoImpl
from src.core.db.models.secondary_models.models import UserToGroupModel
from src.endpoints.group.models import GroupModel
from src.endpoints.group.schemas import (
    CreateGroupSchema,
    ReadGroupSchema,
    UpdateGroupSchema,
)
from src.endpoints.role.user_role.models import UserToRoleModel


class GroupDaoProtocol(
    DaoProtocol[GroupModel, ReadGroupSchema, CreateGroupSchema, UpdateGroupSchema],
    Protocol,
):
    @override
    async def create(
        self, obj: CreateGroupSchema, user_id: UUID
    ) -> ReadGroupSchema: ...

    async def is_user_in_group(self, id: UUID, user_id: UUID) -> bool: ...

    async def add_user_to_group(self, id: UUID, user_id: UUID) -> bool: ...

    async def get_groups_by_user(self, user_id: UUID) -> list[ReadGroupSchema]: ...

    async def add_role_to_user(self, user_id: UUID, role_id: UUID) -> bool: ...


class GroupSqlDao(
    SqlDaoImpl[GroupModel, ReadGroupSchema, CreateGroupSchema, UpdateGroupSchema],
):
    @override
    async def create(self, obj: CreateGroupSchema, user_id: UUID) -> ReadGroupSchema:
        obj: GroupModel = GroupModel(**obj.model_dump())
        self.session.add(obj)
        await self.session.flush()
        await self.session.execute(
            insert(UserToGroupModel).values(group_id=obj.id, user_id=user_id)
        )
        await self.session.commit()
        await self.session.refresh(obj)
        return self.read_schema_type.model_validate(obj)

    async def is_user_in_group(self, id: UUID, user_id: UUID) -> bool:
        result = await self.session.execute(
            select(UserToGroupModel)
            .filter(UserToGroupModel.c.user_id == user_id)
            .filter(UserToGroupModel.c.group_id == id)
        )
        if result.scalar_one_or_none() is None:
            return False

        return True

    async def add_user_to_group(self, id: UUID, user_id: UUID) -> bool:
        await self.session.execute(
            insert(UserToGroupModel).values(group_id=id, user_id=user_id)
        )
        await self.session.commit()
        return True

    async def get_groups_by_user(self, user_id: UUID) -> list[ReadGroupSchema]:
        result = await self.session.execute(
            select(GroupModel).join(
                UserToGroupModel,
                and_(
                    UserToGroupModel.c.user_id == user_id,
                    UserToGroupModel.c.group_id == GroupModel.id,
                ),
            )
        )
        return [ReadGroupSchema.model_validate(i) for i in result.scalars().all()]

    async def add_role_to_user(self, user_id: UUID, role_id: UUID) -> bool:
        await self.session.execute(insert(UserToRoleModel).values(user_id, role_id))
        await self.session.commit()
        return True
