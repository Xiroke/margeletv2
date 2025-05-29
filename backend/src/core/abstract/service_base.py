from typing import Any
from uuid import UUID

from src.core.abstract.dao_base import DaoBase


class BaseService:
    """
    Root class for all Service class
    """

    pass


class DaoBaseService[T](BaseService):
    """Abstract class founded dao methods with permission,
    T - return type"""

    def __init__(self, dao: DaoBase[T]):
        self.dao = dao

    async def get_one_by_id(self, id: UUID) -> T | None:
        return await self.dao.get_one_by_id(id)

    async def get_one_by_field(self, *filter: Any) -> T | None:
        return await self.dao.get_one_by_field(*filter)

    async def get_many_by_field(self, *filter: Any) -> list[T]:
        return list(await self.dao.get_many_by_field(*filter))

    async def get_all(self) -> list[T]:
        return list(await self.dao.get_all())

    async def create(self, obj: T) -> T:
        return await self.dao.create(obj)

    async def update_one_by_id(self, values: dict, id: UUID) -> None:
        await self.dao.update_one_by_id(values, id)

    async def delete(self, obj: Any) -> None:
        return await self.dao.delete(obj)
