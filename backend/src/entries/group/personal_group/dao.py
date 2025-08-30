from typing import Protocol, override
from uuid import UUID

from sqlalchemy import and_, func, select

from src.core.abstract.dao.dao import DaoProtocol
from src.core.abstract.dao.sql_impl import SqlDaoImpl
from src.entries.auth.user.models import UserModel
from src.entries.group.group.models import GroupModel, UserToGroupModel
from src.utils.exceptions import UniqueViolationError

from ..group.dao import GroupDaoProtocolBase, GroupSqlDaoBase
from .models import PersonalGroupModel
from .schemas import (
    CreatePersonalGroupSchema,
    ReadPersonalGroupSchema,
    UpdatePersonalGroupSchema,
)


class PersonalGroupDaoProtocol(
    DaoProtocol[
        PersonalGroupModel,
        UUID,
        ReadPersonalGroupSchema,
        CreatePersonalGroupSchema,
        UpdatePersonalGroupSchema,
    ],
    GroupDaoProtocolBase,
    Protocol,
):
    @override
    async def create(
        self, obj: CreatePersonalGroupSchema, user_id: UUID
    ) -> ReadPersonalGroupSchema: ...
    async def get_groups_by_user(self, user_id: UUID): ...
    async def is_exist_personal_group(
        self, user_id: UUID, other_user_id: UUID
    ) -> bool: ...

    """Returns false if there is no personal group between users."""


class PersonalGroupSqlDao(
    SqlDaoImpl[
        PersonalGroupModel,
        UUID,
        ReadPersonalGroupSchema,
        CreatePersonalGroupSchema,
        UpdatePersonalGroupSchema,
    ],
    GroupSqlDaoBase,
):
    @override
    async def create(
        self, obj: CreatePersonalGroupSchema, user_id: UUID, other_user_id: UUID
    ) -> ReadPersonalGroupSchema:
        # prevent dublication group
        status = await self.is_exist_personal_group(user_id, other_user_id)

        if status:
            raise UniqueViolationError("Personal group already exists")

        group = PersonalGroupModel(**obj.model_dump())
        self.session.add(group)
        await self.session.flush()
        await self.session.refresh(group)
        await self.add_user_to_group(group.id, user_id)
        await self.add_user_to_group(group.id, other_user_id)
        return ReadPersonalGroupSchema.model_validate(group)

    async def get_groups_by_user(self, user_id: UUID):
        data = await self._get_groups_by_user(PersonalGroupModel, user_id)
        return [ReadPersonalGroupSchema.model_validate(item) for item in data]

    async def is_exist_personal_group(self, user_id: UUID, other_user_id: UUID) -> bool:
        smtp = (
            select(func.count())
            .select_from(GroupModel)
            .join(UserToGroupModel, GroupModel.id == UserToGroupModel.group_id)
            .join(UserModel, UserModel.id == UserToGroupModel.user_id)
            .filter(
                and_(
                    UserToGroupModel.user_id.in_((user_id, other_user_id)),
                    GroupModel.type == "personal_group",
                )
            )
            .group_by(GroupModel.id)
            .having(func.count() == 2)
        )
        result_raw = await self.session.execute(smtp)
        result = result_raw.scalar_one_or_none()

        return True if result is not None else False
