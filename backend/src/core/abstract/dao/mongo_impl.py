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
    """Mongo implementation of Dao with default crud methods"""

    model_type: type[Document]

    async def get(self, id: IDType) -> ReadSchemaType:
        result = await self.model_type.get(id, fetch_links=True)

        if result is None:
            raise ModelNotFoundException(self.model_type.__name__, id)

        return self.read_schema_type.model_validate(result)

    async def _get_by(self, **kwargs) -> ReadSchemaType:
        result = await self.model_type.find_one(**kwargs, fetch_links=True)

        if result is None:
            raise ModelNotFoundException(self.model_type.__name__, str(id))

        return self.read_schema_type.model_validate(result)

    async def get_many(self, ids: list[IDType]) -> list[ReadSchemaType]:
        result = await self.model_type.find(
            {"_id": {"$in": ids}}, fetch_links=True
        ).to_list()
        return [self.read_schema_type.model_validate(i) for i in result]

    async def create(self, obj: CreateSchemaType) -> ReadSchemaType:
        obj_model = self.model_type(**obj.model_dump())
        result = await obj_model.insert()
        return self.read_schema_type.model_validate(result)

    async def update(self, id: IDType, obj: UpdateSchemaType) -> ReadSchemaType:
        obj_model = await self.model_type.find_one(self.model_type.id == id)

        if obj_model is None:
            raise ModelNotFoundException(self.model_type.__name__, id)

        result = await obj_model.update(obj.model_dump(exclude_unset=True))

        return self.read_schema_type.model_validate(result)

    async def delete(self, id: IDType) -> bool:
        result = await self.model_type.get(id)

        if result is None:
            raise ModelNotFoundException(self.model_type.__name__, id)

        await result.delete()

        return True
