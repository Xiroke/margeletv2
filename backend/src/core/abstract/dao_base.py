from abc import ABC, abstractmethod
from typing import TYPE_CHECKING, Any
from uuid import UUID

from beanie import Document
from sqlalchemy import delete, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.db.database import Base


class DaoBase[T](ABC):
    """Abstract class for Dao"""

    @abstractmethod
    async def get_one_by_id(self, id: int | UUID) -> T:
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
    async def create(self, obj: Any) -> T:
        pass

    @abstractmethod
    async def update(self, values: dict, *filter: Any) -> T:
        """You should pass filter as Model.id == id"""
        pass

    @abstractmethod
    async def delete(self, obj: Any) -> None:
        pass


class SqlDaoBase[SM: Base](DaoBase[SM]):
    "Sql implementation of Dao without any methods"

    def __init__(self, session: AsyncSession, model: type[SM]):
        self.session = session
        self.model = model


class SqlDaoBaseDefault[SM: Base](SqlDaoBase[SM]):
    """Sql implementation of Dao with default crud methods"""

    def __init__(self, session: AsyncSession, model: type[SM]):
        super().__init__(session, model)

    async def get_one_by_id(self, id: int | UUID):
        result = await self.session.execute(
            select(self.model).filter(self.model.id == id)
        )
        return result.scalars().one()

    async def get_one_by_field(self, *filter) -> SM:
        result = await self.session.execute(select(self.model).filter(*filter))
        return result.scalars().one()

    async def get_many_by_field(self, *filter) -> list[SM]:
        result = await self.session.execute(select(self.model).filter(*filter))
        return list(result.scalars().all())

    async def get_all(self) -> list[SM]:
        result = await self.session.execute(select(self.model))
        return list(result.scalars().all())

    async def create(self, obj: SM) -> SM:
        self.session.add(obj)
        await self.session.commit()
        await self.session.refresh(obj)
        return obj

    async def update(self, values: dict, *filter) -> SM:
        result = await self.session.execute(
            update(self.model).filter(*filter).values(**values)
        )
        await self.session.commit()
        return result.scalars().one()

    async def delete(self, id) -> None:
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

    async def get_one_by_id(self, id: int | UUID):
        result = await self.model.get(id, fetch_links=True)
        return result

    async def get_one_by_field(self, *filter) -> D | None:
        result = await self.model.find_one(*filter, fetch_links=True)
        return result

    async def get_many_by_field(self, *filter) -> list[D]:
        result = await self.model.find(*filter, fetch_links=True).to_list()
        return result

    async def get_all(self) -> list[D]:
        result = await self.model.find(fetch_links=True).to_list()
        return result

    async def create(self, obj: dict):
        document = self.model(**obj)
        return await document.insert()

    async def update(self, values: dict, *filter):
        result = await self.model.find_one(*filter)

        if result is None:
            raise ValueError("Object not found")

        return await result.update_one(**values)

    async def delete(self, id: int | UUID):
        result = await self.model.get(id)

        if result is None:
            raise ValueError("Object not found")

        await result.delete()
