from beanie import Document


class NoSqlDAOBase[T: Document]:
    model: T = None

    @classmethod
    async def get_one_by_id(cls, id: any):
        result = await cls.model.get(id, fetch_links=True)
        return result

    @classmethod
    async def get_one_by_field(cls, *filter) -> T | None:
        result = await cls.model.find_one(*filter, fetch_links=True)
        return result

    @classmethod
    async def get_all_by_field(cls, *filter) -> list[T]:
        result = await cls.model.find(*filter, fetch_links=True).to_list()
        return result

    @classmethod
    async def create(cls, obj: dict):
        document = cls.model(**obj)
        return await document.insert()

    @classmethod
    async def update(cls, obj: dict, **filter):
        await cls.model.find_one(**filter).update_one(**obj)

    @classmethod
    async def delete(cls, **filter):
        await cls.model.find_one(**filter).delete()
