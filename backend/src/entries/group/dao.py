from abc import ABC
from typing import Protocol
from uuid import UUID

from sqlalchemy import and_, delete, insert, select

from src.core.abstract.dao import DaoProtocol, SqlDaoImpl
from src.core.types import (
    CreateSchemaType,
    IDType,
    ModelType,
    ReadSchemaType,
    UpdateSchemaType,
)

from .models import GroupModel, UserToGroupModel
from .schemas import CreateGroupSchema, ReadGroupSchema, UpdateGroupSchema


class GroupDaoProtocol(
    DaoProtocol[
        GroupModel, UUID, ReadGroupSchema, CreateGroupSchema, UpdateGroupSchema
    ],
    Protocol,
):
    async def _set_admin_group(self, group_id: UUID, user_id: UUID) -> None:
        """Set the admin (usually when creating a group)"""

    async def is_user_in_group(self, group_id: UUID, user_id: UUID) -> bool: ...
    async def add_user_to_group(self, group_id: UUID, user_id: UUID) -> None: ...
    async def remove_user_from_group(self, group_id: UUID, user_id: UUID) -> None: ...
    async def get_groups_by_user(self, user_id: UUID) -> list[ReadGroupSchema]: ...
    async def add_role_to_user(self, user_id: UUID, role_id: UUID) -> None: ...


class GroupSqlDao(
    SqlDaoImpl[
        ModelType,
        IDType,
        ReadSchemaType,
        CreateSchemaType,
        UpdateSchemaType,
    ],
    ABC,
):
    async def _set_admin_group(self, group_id: UUID, user_id: UUID) -> None:
        await self.session.execute(
            insert(UserToGroupModel).values(group_id=group_id, user_id=user_id)
        )
        await self.session.flush()

    async def is_user_in_group(self, group_id: UUID, user_id: UUID) -> bool:
        result = await self.session.execute(
            select(UserToGroupModel)
            .filter(UserToGroupModel.user_id == user_id)
            .filter(UserToGroupModel.group_id == group_id)
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
                    UserToGroupModel.user_id == user_id,
                    UserToGroupModel.group_id == group_id,
                )
            )
        )
        await self.session.flush()

    async def get_groups_by_user(self, user_id: UUID) -> list[ReadGroupSchema]:
        result = await self.session.execute(
            select(GroupModel).join(
                UserToGroupModel,
                and_(
                    UserToGroupModel.user_id == user_id,
                    UserToGroupModel.group_id == GroupModel.id,
                ),
            )
        )
        return [ReadGroupSchema.model_validate(i) for i in result.scalars().all()]

    # async def add_role_to_user(self, user_id: UUID, role_id: UUID) -> None:
    #     await self.session.execute(
    #         insert(UserToRoleModel).values(user_id=user_id, role_id=role_id)
    #     )
    #     await self.session.flush()
