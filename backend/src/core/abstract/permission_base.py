from typing import Any

from src.core.abstract.dao_base import DaoBase
from src.utils.exeptions import NotFoundModelException, PermissionNotHasAttributeError


class PermissionBase:
    """
    Class for check a conditions in router,
    raise exeptions, which handled in exception handler
    """

    def is_has_value(self, obj: Any, field: str) -> None:
        """Is required field in object has any data"""
        assert hasattr(self, obj)

        result = getattr(self, field)

        if result is not None:
            raise PermissionNotHasAttributeError()

        return result


class PermissionDaoBase(PermissionBase):
    """Abstract class for check permission"""

    def __init__(self, dao: DaoBase, model: Any):
        self.dao = dao
        self.model = model

    async def is_exist(self, id: Any) -> None:
        """use for check is exist object, return object for optimization"""
        assert hasattr(self.model, "id")

        result = await self.dao.get_one_by_field(self.model.id == id)

        if result is None:
            raise NotFoundModelException()

        return result

    def is_has_value_model(self, id: Any, field: str) -> None:
        """checks if the model instance contains a field"""
        db_result = self.dao.get_one_by_id(id)

        assert hasattr(db_result, field)

        result = getattr(db_result, field)

        if result is not None:
            raise PermissionNotHasAttributeError()

        return result
