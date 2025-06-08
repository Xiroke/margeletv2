from typing import Any
from uuid import UUID

from src.core.abstract.dao_base import Dao, DaoProtocol
from src.utils.types import (
    CreateSchemaType,
    ModelType,
    ReadSchemaType,
    UpdateSchemaType,
)


class BaseService:
    """
    Root class for all Service class
    """

    pass


class DaoServiceProtocol(
    DaoProtocol[ModelType, ReadSchemaType, CreateSchemaType, UpdateSchemaType]
):
    pass


class DaoService(
    Dao[ModelType, ReadSchemaType, CreateSchemaType, UpdateSchemaType], BaseService
):
    """Abstract class founded dao methods with permission,
    T - return type"""

    def __init__(
        self,
        dao: DaoProtocol[ModelType, ReadSchemaType, CreateSchemaType, UpdateSchemaType],
    ):
        self.dao = dao

    async def get_one_by_id(self, id: UUID) -> ReadSchemaType:
        return await self.dao.get_one_by_id(id)

    async def get_one_by_field(self, *filter: Any) -> ReadSchemaType:
        return await self.dao.get_one_by_field(*filter)

    async def get_many_by_field(self, *filter: Any) -> list[ReadSchemaType]:
        return await self.dao.get_many_by_field(*filter)

    async def get_all(self) -> list[ReadSchemaType]:
        return await self.dao.get_all()

    async def create(self, obj: CreateSchemaType) -> ReadSchemaType:
        return await self.dao.create(obj)

    async def update_by_id(self, id: UUID, obj: UpdateSchemaType) -> ReadSchemaType:
        return await self.dao.update_by_id(id, obj)

    async def delete(self, obj: Any) -> bool:
        return await self.dao.delete(obj)
