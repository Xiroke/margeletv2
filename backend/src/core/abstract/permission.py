import inspect
from abc import ABC, abstractmethod
from functools import wraps
from typing import Any, Callable

from fastapi import Depends

from src.utils.exceptions import HTTPPermissionDeniedException

PermissionFuncType = Callable[..., bool]


class Permission(ABC):
    """
    Base class for permissions

    Example usage:

    class AuthPermission(Permission):
        @staticmethod
        def is_auth() -> bool:
            return True

        @staticmethod
        def permissions():
            return {"is_auth": AuthPermission.is_auth}
    """

    @staticmethod
    @abstractmethod
    def permissions() -> dict[str, PermissionFuncType]:
        """Return a dictionary of permissions"""


class PermissionManager:
    _permissions: dict[str, PermissionFuncType] = {
        "forbidden": lambda: False,
        "bool": lambda value: value == "True",
    }

    @classmethod
    def register(cls, permsission_class: type[Permission]):
        cls._permissions.update(permsission_class.permissions())

    @classmethod
    def register_raw(cls, permsission: dict[str, PermissionFuncType]):
        cls._permissions.update(permsission)

    @classmethod
    def _create_checked_wrapper(
        cls, permission: PermissionFuncType
    ) -> Callable[[], Any]:
        """
        Creates a wrapper that automatically triggers a check with its dependencies
        """

        @wraps(permission)
        async def wrapped_permission(**deps):
            result = permission(**deps)
            # for async functions
            if inspect.isawaitable(result):
                result = await result  # type: ignore
            if not result:
                raise HTTPPermissionDeniedException()
            return result

        return wrapped_permission

    @classmethod
    def create_dependency(cls, rule: str):
        """Creates a dependency for the given rule"""
        permission = cls._create_checked_wrapper(cls._permissions[rule])

        return Depends(permission)


def perms(rules: list[str]):
    return [PermissionManager.create_dependency(rule) for rule in rules]
