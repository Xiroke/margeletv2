# register permissions
from src.core.abstract.permission import PermissionManager
from src.entries.auth.permissions import AuthPermission


def register_permission():
    PermissionManager.register(AuthPermission)
