from abc import ABC
from uuid import UUID

from beanie import Document


class NoSqlDaoBaseBase[T: Document](ABC):
    model: type[T]

    @classmethod
    async def get_one_by_id(cls, id: int | UUID):
        result = await cls.model.get(id, fetch_links=True)
        return result

    @classmethod
    async def get_one_by_field(cls, *filter) -> T | None:
        result = await cls.model.find_one(*filter, fetch_links=True)
        return result

    @classmethod
    async def get_many_by_field(cls, *filter) -> list[T]:
        result = await cls.model.find(*filter, fetch_links=True).to_list()
        return result

    @classmethod
    async def create(cls, obj: dict):
        document = cls.model(**obj)
        return await document.insert()

    @classmethod
    async def update(cls, obj: dict, **filter):
        result = await cls.model.find_one(**filter)

        if result is None:
            raise ValueError("Object not found")

        return await result.update_one(**obj)

    @classmethod
    async def delete_by_id(cls, id: int | UUID):
        result = await cls.model.get(id)

        if result is None:
            raise ValueError("Object not found")

        await result.delete()
