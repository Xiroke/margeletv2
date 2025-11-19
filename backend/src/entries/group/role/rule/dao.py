from typing import Any, Protocol
from uuid import UUID

from sqlalchemy import select

from src.core.abstract.dao import DaoProtocol, SqlDaoImpl
from src.entries.group.group.models import UserToGroupModel
from src.entries.group.role.models import RoleModel, RoleToUserGroup

from .models import RoleToRuleModel, RuleModel
from .schemas import RuleCreate, RuleRead


class RuleDaoProtocol(
    DaoProtocol[RuleModel, str, RuleRead, RuleCreate, Any],
    Protocol,
):
    async def get_user_rules_in_group(
        self, user_id: UUID, group_id: UUID
    ) -> list[str]: ...

    """Get all user's rules from all roles in concrete group"""

    async def get_rules_by_id_raw(self, ids: list[str]) -> list[RuleModel]: ...


class RuleSqlDao(SqlDaoImpl[RuleModel, str, RuleRead, RuleCreate, Any]):
    async def get_user_rules_in_group(self, user_id: UUID, group_id: UUID) -> list[str]:
        smtp = (
            select(RuleModel.id)
            .distinct()
            .join(RoleToRuleModel, RoleToRuleModel.rule_id == RuleModel.id)
            .join(RoleModel, RoleModel.id == RoleToRuleModel.role_id)
            .join(
                UserToGroupModel,
                RoleToUserGroup.user_group_id == UserToGroupModel.id,
            )
            .filter(
                UserToGroupModel.user_id == user_id,
                UserToGroupModel.group_id == group_id,
            )
        )
        result = await self.session.execute(smtp)

        return list(result.scalars().all())

    async def get_rules_by_id_raw(self, ids: list[str]) -> list[RuleModel]:
        smtp = select(RuleModel).filter(RuleModel.id.in_(ids))

        result = await self.session.execute(smtp)

        return list(result.scalars().all())
