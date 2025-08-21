from typing import Any, Protocol
from uuid import UUID

from sqlalchemy import select

from src.core.abstract.dao import DaoProtocol, SqlDaoImpl
from src.entries.group.models import UserToGroupModel
from src.entries.group.role.models import RoleModel

from .models import RoleToRuleModel, RuleModel
from .schemas import CreateRuleSchema, ReadRuleSchema


class RuleDaoProtocol(
    DaoProtocol[RuleModel, int, ReadRuleSchema, CreateRuleSchema, Any],
    Protocol,
):
    async def get_user_rules_in_group(
        self, user_id: UUID, group_id: UUID
    ) -> list[str]: ...

    """Get all user's rules from all roles in concrete group"""


class RuleSqlDao(SqlDaoImpl[RuleModel, int, ReadRuleSchema, CreateRuleSchema, Any]):
    async def get_user_rules_in_group(self, user_id: UUID, group_id: UUID) -> list[str]:
        smtp = (
            select(RuleModel.value)
            .distinct()
            .join(RoleToRuleModel, RoleToRuleModel.rule_id == RuleModel.id)
            .join(RoleModel, RoleModel.id == RoleToRuleModel.role_id)
            .join(
                UserToGroupModel,
                RoleModel.user_group_id == UserToGroupModel.id,
            )
            .filter(
                UserToGroupModel.user_id == user_id,
                UserToGroupModel.group_id == group_id,
            )
        )
        result = await self.session.execute(smtp)

        return list(result.scalars().all())
