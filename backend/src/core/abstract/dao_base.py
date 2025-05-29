from abc import ABC, abstractmethod
from typing import TYPE_CHECKING
from uuid import UUID

from beanie import Document
from sqlalchemy import delete, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.db.database import Base


class DaoBase[T](ABC):
    """Abstract class for Dao"""

    @abstractmethod
    async def get_one_by_id(self, id: UUID) -> T:
        pass

    @abstractmethod
    async def get_one_by_field(self, *filter) -> T:
        """You should pass filter as Model.id == id"""
        pass

    @abstractmethod
    async def get_many_by_field(self, *filter) -> list[T]:
        """You should pass filter as Model.id == id"""
        pass

    @abstractmethod
    async def get_all(self) -> list[T]:
        pass

    @abstractmethod
    async def create(self, obj: T) -> T:
        pass

    @abstractmethod
    async def update_one_by_id(self, values: dict, id: UUID) -> None:
        """You should pass filter as Model.id == id"""
        pass

    @abstractmethod
    async def delete(self, id: UUID) -> None:
        pass


class SqlDaoBase[M: Base](DaoBase[M]):
    "Sql implementation of Dao without any methods"

    def __init__(self, session: AsyncSession, model: type[M]):
        self.session = session
        self.model = model


class SqlDaoBaseDefault[M: Base](SqlDaoBase[M]):
    """Sql implementation of Dao with default crud methods"""

    def __init__(self, session: AsyncSession, model: type[M]):
        super().__init__(session, model)

    async def get_one_by_id(self, id: UUID) -> M:
        result = await self.session.execute(
            select(self.model).filter(self.model.id == id)
        )
        return result.scalars().one()

    async def get_one_by_field(self, *filter) -> M:
        result = await self.session.execute(select(self.model).filter(*filter))
        return result.scalars().one()

    async def get_many_by_field(self, *filter) -> list[M]:
        result = await self.session.execute(select(self.model).filter(*filter))
        return list(result.scalars().all())

    async def get_all(self) -> list[M]:
        result = await self.session.execute(select(self.model))
        return list(result.scalars().all())

    async def create(self, obj: M) -> M:
        self.session.add(obj)
        await self.session.commit()
        await self.session.refresh(obj)
        return obj

    async def update_one_by_id(self, values: dict, id: UUID) -> None:
        await self.session.execute(
            update(self.model).filter(self.model.id == id).values(**values)
        )
        await self.session.commit()

    async def delete(self, id: UUID) -> None:
        assert hasattr(self.model, "id")

        await self.session.execute(delete(self.model).filter(self.model.id == id))  # type: ignore
        await self.session.commit()


class MongoDaoBase[D: Document](DaoBase[D]):
    "Mongo implementation of Dao"

    def __init__(self, model: type[D]):
        self.model = model


class MongoDaoBaseDefault[D: Document](MongoDaoBase[D]):
    """Mongo implementation of Dao with default crud methods"""

    def __init__(self, model: type[D]):
        if TYPE_CHECKING:
            self.model = model

        super().__init__(model)

    async def get_one_by_id(self, id: UUID) -> D:
        result = await self.model.get(id, fetch_links=True)

        if result is None:
            raise ValueError("Object not found")

        return result

    async def get_one_by_field(self, *filter) -> D:
        result = await self.model.find_one(*filter, fetch_links=True)

        if result is None:
            raise ValueError("Object not found")

        return result

    async def get_many_by_field(self, *filter) -> list[D]:
        result = await self.model.find(*filter, fetch_links=True).to_list()
        return result

    async def get_all(self) -> list[D]:
        result = await self.model.find(fetch_links=True).to_list()
        return result

    async def create(self, obj: D) -> D:
        return await obj.insert()

    async def update_one_by_id(self, values: dict, id: UUID):
        result = await self.model.find_one(self.model.id == id)

        if result is None:
            raise ValueError("Object not found")

        await result.update(**values)

    async def delete(self, id: UUID):
        result = await self.model.get(id)

        if result is None:
            raise ValueError("Object not found")

        await result.delete()
