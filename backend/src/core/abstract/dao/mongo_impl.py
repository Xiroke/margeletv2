from typing import Any, cast

from beanie import Document

from src.core.types import (
    CreateSchemaType,
    IDType,
    ModelType,
    ReadSchemaType,
    UpdateSchemaType,
)
from src.utils.exceptions import ModelNotFoundException

from .dao import Dao


class MongoDaoImpl(
    Dao[
        ModelType,
        IDType,
        ReadSchemaType,
        CreateSchemaType,
        UpdateSchemaType,
    ],
):
    """MongoDB (Beanie) implementation of Dao with fully generic CRUD methods."""

    model_type: type[Document]

    async def get(self, **filters) -> ReadSchemaType:
        result = await self.model_type.find_one(**filters, fetch_links=True)
        self._raise_if_none(result, filters)
        return self._model_to_read_schema(result)

    async def get_many(self, **filters) -> list[ReadSchemaType]:
        query = self._handle_filters(filters)
        cursor = self.model_type.find(query, fetch_links=True)
        results = await cursor.to_list()
        return self._models_to_read_schemas(results)

    async def create(
        self, obj: CreateSchemaType, returning: bool = False
    ) -> ReadSchemaType | None:
        obj_model = self.model_type(**obj.model_dump())

        result = await obj_model.insert()

        if not returning:
            return

        return self._model_to_read_schema(result)

    async def update(
        self, filters: dict[str, Any], obj: UpdateSchemaType, returning: bool = False
    ) -> ReadSchemaType | None:
        existing = await self.model_type.find_one(**filters)
        self._raise_if_none(existing, filters)

        existing = cast(Document, existing)

        update_data = obj.model_dump(exclude_unset=True)
        await existing.update({"$set": update_data})

        if not returning:
            return

        updated = await self.model_type.get(existing.id, fetch_links=True)
        return self._model_to_read_schema(updated)

    async def delete(self, **filters) -> None:
        delete_result = await self.model_type.find(**filters).delete()
        if not delete_result or delete_result.deleted_count == 0:
            raise ModelNotFoundException(self.model_type.__name__, str(filters))

    def _handle_filters(self, filters: dict[str, Any]) -> dict:
        query = {}
        for key, value in filters.items():
            if isinstance(value, (list, tuple, set)):
                query[key] = {"$in": list(value)}
            else:
                query[key] = value
        return query

    def _model_to_read_schema(self, model) -> ReadSchemaType:
        return self.read_schema_type.model_validate(model)

    def _models_to_read_schemas(self, models) -> list[ReadSchemaType]:
        return [self.read_schema_type.model_validate(m) for m in models]

    def _raise_if_none(self, record, filters: Any = None) -> None:
        if record is None:
            raise ModelNotFoundException(
                self.model_type.__name__, str(filters or "No filters")
            )
