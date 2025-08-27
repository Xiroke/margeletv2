# register permissions
from src.core.abstract.permission import PermissionManager
from src.entries.auth.permissions import AuthPermission
from src.entries.group.role.rule.permissions import RulePermission


def register_permission():
    PermissionManager.register(AuthPermission)
    PermissionManager.register(RulePermission)
