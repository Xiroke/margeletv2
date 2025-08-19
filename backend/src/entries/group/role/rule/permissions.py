from functools import wraps
from uuid import UUID

from src.core.abstract.permission import Permission
from src.entries.auth.depends import CurrentUserDep
from src.entries.group.role.rule.depends import RuleServiceDep
from src.entries.group.role.rule.enums import RuleEnum


class RulePermission(Permission):
    @staticmethod
    async def is_have_rule(
        rule: RuleEnum,
        user: CurrentUserDep,
        group_id: UUID,
        rule_service: RuleServiceDep,
    ):
        return rule in await rule_service.get_user_rules_in_group(user.id, group_id)

    @staticmethod
    def _make_wrapper(rule: RuleEnum):
        """
        Since permissions are written statically,
        then rules must also be implemented statically
        """

        @wraps(RulePermission.is_have_rule)
        async def wrapper(*args, **kwargs):
            await RulePermission.is_have_rule(*args, **kwargs)

        return wrapper

    @staticmethod
    def permissions():
        """Example r:can_critical"""
        dict_permissions = {}

        for rule in RuleEnum:
            dict_permissions["r:" + rule.value] = RulePermission._make_wrapper(rule)

        return dict_permissions
