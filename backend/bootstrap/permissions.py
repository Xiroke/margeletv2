# register permissions
from src.core.abstract.permission_base import PermissionManager
from src.entries.auth.permissions import AuthPermission


def register_permission():
    PermissionManager.register(AuthPermission)
