from typing import Any
from uuid import UUID

from src.utils.exceptions import (
    NotFoundModelException,
    PermissionNotHasAttributeException,
)


class Permission:
    """
    Class for check a conditions in router,
    raise exeptions, which handled in exception handler
    """

    def is_has_value(self, obj: Any, field: str) -> None:
        """Is required field in object has any data"""
        assert hasattr(self, obj)

        result = getattr(self, field)

        if result is not None:
            raise PermissionNotHasAttributeException()

        return result


class PermissionService(Permission):
    """
    Abstract class for check permission
    Using class for service layer
    """

    def __init__(self, service):
        self.service = service

    async def check_exist_by_id(self, id: UUID, model: Any) -> None:
        """use for check is exist object, return object for optimization"""
        assert hasattr(model, "id")

        result = await self.service.get_one_by_id(id)

        if result is None:
            raise NotFoundModelException()

        return result

    async def is_has_value_model(self, id: Any, field: str) -> None:
        """checks if the model instance contains a field"""
        db_result = await self.service.get_one_by_id(id)

        assert hasattr(db_result, field)

        result = getattr(db_result, field)

        if result is None:
            raise PermissionNotHasAttributeException()

        return result
