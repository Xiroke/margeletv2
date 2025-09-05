from typing import Protocol, override
from uuid import UUID

from sqlalchemy import insert

from src.core.abstract.dao import DaoProtocol
from src.core.abstract.dao.sql_impl import SqlDaoImpl
from src.entries.group.group.dao import GroupDaoProtocolParent, GroupSqlDaoParent
from src.entries.group.group.models import UserToGroupModel
from src.entries.group.role.constants import admin_rules, creator_rules, member_rules
from src.entries.group.role.models import RoleModel, RoleToUserGroup
from src.entries.group.role.rule.models import RoleToRuleModel

from .models import SimpleGroupModel
from .schemas import (
    CreateSimpleGroupSchema,
    ReadSimpleGroupSchema,
    UpdateSimpleGroupSchema,
)


class SimpleGroupDaoProtocol(
    GroupDaoProtocolParent,
    DaoProtocol[
        SimpleGroupModel,
        UUID,
        ReadSimpleGroupSchema,
        CreateSimpleGroupSchema,
        UpdateSimpleGroupSchema,
    ],
    Protocol,
):
    async def create(self, obj: CreateSimpleGroupSchema) -> ReadSimpleGroupSchema: ...
    async def set_creator_group(
        self, group_id: UUID, user_id: UUID, creator_role_id
    ) -> None: ...
    async def generate_basic_roles(self) -> int: ...
    async def get_groups_by_user(
        self, user_id: UUID
    ) -> list[ReadSimpleGroupSchema]: ...


class SimpleGroupSqlDao(
    SqlDaoImpl[
        SimpleGroupModel,
        UUID,
        ReadSimpleGroupSchema,
        CreateSimpleGroupSchema,
        UpdateSimpleGroupSchema,
    ],
    GroupSqlDaoParent,
):
    @override
    async def create(self, obj: CreateSimpleGroupSchema) -> ReadSimpleGroupSchema:
        group = SimpleGroupModel(**obj.model_dump())
        self.session.add(group)
        await self.session.flush()
        return ReadSimpleGroupSchema.model_validate(group)

    async def get_groups_by_user(self, user_id: UUID) -> list[ReadSimpleGroupSchema]:
        data = await self._get_groups_by_user(SimpleGroupModel, user_id)
        return [ReadSimpleGroupSchema.model_validate(item) for item in data]

    async def set_creator_group(
        self, group_id: UUID, user_id: UUID, creator_role_id
    ) -> None:
        # append user to group
        smtp = (
            insert(UserToGroupModel)
            .values(group_id=group_id, user_id=user_id)
            .returning(UserToGroupModel.id)
        )
        user_group_id_raw = await self.session.execute(smtp)
        user_group_id = user_group_id_raw.scalars().one()

        # set creator
        smtp2 = insert(RoleToUserGroup).values(
            role_id=creator_role_id, user_group_id=user_group_id
        )
        await self.session.execute(smtp2)
        await self.session.flush()

    async def generate_basic_roles(self) -> int:
        """
        Generates the roles "creator" "admin" and "member"
        Return creator id"
        """
        role_creator_id_raw = await self.session.execute(
            insert(RoleModel).values(title="Creator").returning(RoleModel.id)
        )
        role_creator_id = role_creator_id_raw.scalar_one()
        await self.session.execute(
            insert(RoleToRuleModel).values(
                [
                    {"role_id": role_creator_id, "rule_id": rule_id}
                    for rule_id in creator_rules
                ]
            )
        )

        role_admin_id_raw = await self.session.execute(
            insert(RoleModel).values(title="Admin").returning(RoleModel.id)
        )
        role_admin_id = role_admin_id_raw.scalar_one()
        await self.session.execute(
            insert(RoleToRuleModel).values(
                [
                    {"role_id": role_admin_id, "rule_id": rule_id}
                    for rule_id in admin_rules
                ]
            )
        )

        role_member_id_raw = await self.session.execute(
            insert(RoleModel).values(title="Newbie").returning(RoleModel.id)
        )
        role_member_id = role_member_id_raw.scalar_one()
        await self.session.execute(
            insert(RoleToRuleModel).values(
                [
                    {"role_id": role_member_id, "rule_id": rule_id}
                    for rule_id in member_rules
                ]
            )
        )

        await self.session.flush()
        return role_creator_id
