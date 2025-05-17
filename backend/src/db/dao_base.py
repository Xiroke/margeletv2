from abc import ABC, abstractmethod
from typing import Any

from sqlalchemy import delete, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.models import Base


class DAOBase[T](ABC):
    """Abstract class for DAO"""

    @abstractmethod
    async def get_one_or_none_by_field(self, **filter: Any) -> T | None:
        pass

    @abstractmethod
    async def get_all_by_field(self, **filter: Any) -> list[T]:
        pass

    @abstractmethod
    async def get_all(self) -> list[T]:
        pass

    @abstractmethod
    async def create(self, obj: Any) -> T:
        pass

    @abstractmethod
    async def update(self, values: dict, **filter: Any) -> T:
        pass

    @abstractmethod
    async def delete(self, obj: Any) -> None:
        pass


class SQLAlchemyDAO[SM: Base](DAOBase[SM]):
    "SQLAlchemy implementation of DAO"

    def __init__(self, session: AsyncSession, model: type[SM]):
        self.session = session
        self.model = model

    async def get_one_or_none_by_field(self, **filter) -> SM | None:
        result = await self.session.execute(select(self.model).filter_by(**filter))
        return result.scalars().one_or_none()

    async def get_all_by_field(self, **filter) -> list[SM]:
        result = await self.session.execute(select(self.model).filter_by(**filter))
        return list(result.scalars().all())

    async def get_all(self) -> list[SM]:
        result = await self.session.execute(select(self.model))
        return list(result.scalars().all())

    async def create(self, obj: SM) -> SM:
        self.session.add(obj)
        await self.session.commit()
        await self.session.refresh(obj)
        return obj

    async def update(self, values: dict, **filter) -> SM:
        result = await self.session.execute(
            update(self.model).filter_by(**filter).values(**obj)
        )
        await self.session.commit()
        return result.scalars().one()

    async def delete(self, id) -> None:
        await self.session.execute(delete(self.model).filter_by(id=id))
        await self.session.commit()
