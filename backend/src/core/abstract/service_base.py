from typing import Any

from src.core.abstract.dao_base import DaoBase
from src.core.abstract.permission_base import PermissionDaoBase


class DaoBaseService[T]:
    """Abstract class founded dao methods with permission,
    T - return type"""

    def __init__(self, dao: DaoBase[T], permission: PermissionDaoBase):
        self.dao = dao
        self._permission = permission

    async def permission_manager(self):
        return self._permission

    async def get_one_by_field(self, *filter: Any) -> T | None:
        return await self.dao.get_one_by_field(*filter)

    async def get_many_by_field(self, *filter: Any) -> list[T]:
        return list(await self.dao.get_many_by_field(*filter))

    async def get_all(self) -> list[T]:
        return list(await self.dao.get_all())

    async def create(self, obj: T, *args, **kwargs) -> T:
        return await self.dao.create(obj, *args, **kwargs)

    async def update(self, values: dict, **filter: Any) -> T:
        return await self.dao.update(values, **filter)

    async def delete(self, obj: Any) -> None:
        return await self.dao.delete(obj)
