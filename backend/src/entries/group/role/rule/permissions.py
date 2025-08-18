from src.core.abstract.permission import Permission
from src.entries.group.role.rule.enums import RuleEnum


class RulePermission(Permission):
    @staticmethod
    def is_have_rule(rule: RuleEnum):
        pass

    @staticmethod
    def permissions():
        return {"r:{rule}": RulePermission.is_have_rule}
