from src.core.abstract.permission import Permission

from .depends import CurrentUserDep


class AuthPermission(Permission):
    @staticmethod
    def is_auth(user: CurrentUserDep) -> bool:
        return user is not None

    @staticmethod
    def permissions():
        return {"is_auth": AuthPermission.is_auth}
