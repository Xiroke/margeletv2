from src.core.abstract.permission_base import Permission

from .depends import current_user


class AuthPermission(Permission):
    @staticmethod
    def is_auth(user: current_user) -> bool:
        return user is not None

    @staticmethod
    def permissions():
        return {"is_auth": AuthPermission.is_auth}
