from abc import ABC
from typing import Any

from sqlalchemy import delete, insert, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.db.database import Base
from src.core.types import (
    CreateSchemaType,
    IDType,
    ModelType,
    ReadSchemaType,
    UpdateSchemaType,
)
from src.utils.exceptions import ModelNotFoundException

from .dao import Dao


class SqlDaoImpl(
    Dao[
        ModelType,
        IDType,
        ReadSchemaType,
        CreateSchemaType,
        UpdateSchemaType,
    ],
    ABC,
):
    """SQL DAO implementation with fully generic CRUD methods."""

    model_type: type[Base]

    def __init__(self, session: AsyncSession):
        self.session = session

    async def get(self, **filters) -> ReadSchemaType:
        stmt = select(self.model_type)
        stmt = self._handle_filters(stmt, filters, is_many=False)
        return await self._execute_and_return_one(stmt)

    async def get_many(self, **filters) -> list[ReadSchemaType]:
        stmt = select(self.model_type)
        stmt = self._handle_filters(stmt, filters, is_many=True)
        result = await self.session.execute(stmt)
        return self._models_to_read_schemas(result.scalars().all())

    async def create(
        self, obj: CreateSchemaType, returning: bool = False
    ) -> ReadSchemaType | None:
        stmt = insert(self.model_type).values(**obj.model_dump())

        if returning:
            stmt = stmt.returning(self.model_type)
            return await self._execute_and_return_one(stmt, flush=True)

        await self.session.execute(stmt)

    async def update(
        self,
        obj: UpdateSchemaType,
        returning: bool = False,
        is_many: bool = False,
        **filters,
    ) -> ReadSchemaType | None:
        if not is_many:
            existing = await self.get(**filters)
            if existing is None:
                raise ModelNotFoundException(self.model_type.__name__, str(filters))

        values = obj.model_dump(exclude_unset=True)
        stmt = update(self.model_type)
        stmt = self._handle_filters(stmt, filters, is_many)
        stmt = stmt.values(**values)
        print("values " + str(values))

        if returning:
            stmt = stmt.returning(self.model_type)
            return await self._execute_and_return_one(stmt, flush=True)

        await self.session.execute(stmt)

    async def delete(
        self,
        is_many: bool = False,
        **filters,
    ) -> None:
        stmt = delete(self.model_type)
        stmt = self._handle_filters(stmt, filters, is_many)
        await self.session.execute(stmt)

    async def _execute_and_return_one(
        self, stmt, flush: bool = False
    ) -> ReadSchemaType:
        result = await self.session.execute(stmt)

        if flush:
            await self.session.flush()

        record = result.scalar_one_or_none()

        if record is None:
            raise ModelNotFoundException(self.model_type.__name__, "No record found")

        return self._model_to_read_schema(record)

    def _model_to_read_schema(self, model) -> ReadSchemaType:
        return self.read_schema_type.model_validate(model)

    def _models_to_read_schemas(self, models) -> list[ReadSchemaType]:
        return [self.read_schema_type.model_validate(m) for m in models]

    def _handle_filters(self, stmt, filters: dict[str, Any], is_many: bool = False):
        for key, value in filters.items():
            column = getattr(self.model_type, key)
            if isinstance(value, (list, tuple, set)):
                if not is_many:
                    raise ValueError(
                        "List filters are not allowed for single-record operations"
                    )
                stmt = stmt.where(column.in_(list(value)))
            else:
                stmt = stmt.where(column == value)
        return stmt
