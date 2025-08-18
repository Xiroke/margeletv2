from typing import Protocol, override
from uuid import UUID

from sqlalchemy import and_, delete, insert, select

from src.core.abstract.dao import DaoProtocol, SqlDaoImpl
from src.core.db.models.secondary_models.models import UserToGroupModel
from src.entries.role.user_role.models import UserToRoleModel

from .models import GroupModel
from .schemas import CreateGroupSchema, ReadGroupSchema, UpdateGroupSchema


class GroupDaoProtocol(
    DaoProtocol[
        GroupModel, UUID, ReadGroupSchema, CreateGroupSchema, UpdateGroupSchema
    ],
    Protocol,
):
    @override
    async def create(
        self, obj: CreateGroupSchema, user_id: UUID
    ) -> ReadGroupSchema: ...
    async def is_user_in_group(self, group_id: UUID, user_id: UUID) -> bool: ...
    async def add_user_to_group(self, group_id: UUID, user_id: UUID) -> None: ...
    async def remove_user_from_group(self, group_id: UUID, user_id: UUID) -> None: ...
    async def get_groups_by_user(self, user_id: UUID) -> list[ReadGroupSchema]: ...
    async def add_role_to_user(self, user_id: UUID, role_id: UUID) -> None: ...


class GroupSqlDao(
    SqlDaoImpl[GroupModel, UUID, ReadGroupSchema, CreateGroupSchema, UpdateGroupSchema],
):
    @override
    async def create(self, obj: CreateGroupSchema, user_id: UUID) -> ReadGroupSchema:
        obj: GroupModel = GroupModel(**obj.model_dump())
        self.session.add(obj)
        await self.session.flush()
        await self.session.execute(
            insert(UserToGroupModel).values(group_id=obj.id, user_id=user_id)
        )
        await self.session.flush()
        await self.session.refresh(obj)
        return self.read_schema_type.model_validate(obj)

    async def is_user_in_group(self, group_id: UUID, user_id: UUID) -> bool:
        result = await self.session.execute(
            select(UserToGroupModel)
            .filter(UserToGroupModel.c.user_id == user_id)
            .filter(UserToGroupModel.c.group_id == group_id)
        )
        return result.scalar_one_or_none() is not None

    async def add_user_to_group(self, group_id: UUID, user_id: UUID) -> None:
        await self.session.execute(
            insert(UserToGroupModel).values(group_id=group_id, user_id=user_id)
        )
        await self.session.flush()

    async def remove_user_from_group(self, group_id: UUID, user_id: UUID) -> None:
        await self.session.execute(
            delete(UserToGroupModel).filter(
                and_(
                    UserToGroupModel.c.user_id == user_id,
                    UserToGroupModel.c.group_id == group_id,
                )
            )
        )
        await self.session.flush()

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

    async def add_role_to_user(self, user_id: UUID, role_id: UUID) -> None:
        await self.session.execute(
            insert(UserToRoleModel).values(user_id=user_id, role_id=role_id)
        )
        await self.session.flush()
