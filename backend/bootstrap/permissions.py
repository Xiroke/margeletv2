# register permissions
from src.core.abstract.permission_base import PermissionManager
from src.endpoints.auth.permissions import AuthPermission


def register_permission():
    PermissionManager.register(AuthPermission)
