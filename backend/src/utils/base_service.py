from abc import ABC
from typing import Any

from src.db.dao_base import DAOBase


class DAOBaseService[T](DAOBase[T], ABC):
    """Abstract class for Service Layer,
    T - return type,
    DAOBase - class which need for check used functions for all DAO methods"""

    def __init__(self, dao: DAOBase[T]):
        """dao - implementation of DAO for work with entities"""
        self.dao = dao

    async def get_one_or_none_by_field(self, **filter: Any) -> T | None:
        return await self.dao.get_one_or_none_by_field(**filter)

    async def get_all_by_field(self, **filter: Any) -> list[T]:
        return list(await self.dao.get_all_by_field(**filter))

    async def get_all(self) -> list[T]:
        return list(await self.dao.get_all())

    async def create(self, obj: T) -> T:
        return await self.dao.create(obj)

    async def update(self, values: dict, **filter: Any) -> T:
        return await self.dao.update(values, **filter)

    async def delete(self, obj: Any) -> None:
        return await self.dao.delete(obj)
