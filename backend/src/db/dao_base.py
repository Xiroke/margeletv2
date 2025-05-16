from typing import Sequence

from sqlalchemy import delete, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from src.utils.exc_handler import MapNoResultFound, handle_error

from .database import Base


class DAOBase[T: Base]:
    model: type[T]

    @classmethod
    @handle_error([MapNoResultFound])
    async def get_one_by_field(cls, session: AsyncSession, **filter):
        result = await session.execute(select(cls.model).filter_by(**filter))
        return result.scalars().one()

    @classmethod
    async def get_one_or_none_by_field(
        cls, session: AsyncSession, **filter
    ) -> T | None:
        result = await session.execute(select(cls.model).filter_by(**filter))
        return result.scalars().one_or_none()

    @classmethod
    async def get_all_by_field(cls, session: AsyncSession, **filter) -> Sequence[T]:
        result = await session.execute(select(cls.model).filter_by(**filter))
        return result.scalars().all()

    @classmethod
    async def get_all(cls, session: AsyncSession) -> Sequence[T]:
        result = await session.execute(select(cls.model))
        return result.scalars().all()

    @classmethod
    async def create(cls, session: AsyncSession, obj: T) -> T:
        session.add(obj)
        await session.commit()
        await session.refresh(obj)
        return obj

    @classmethod
    async def update(cls, session: AsyncSession, obj: dict, **filter) -> None:
        await session.execute(update(cls.model).filter_by(**filter).values(**obj))
        await session.commit()

    @classmethod
    async def delete(cls, session: AsyncSession, id) -> None:
        await session.execute(delete(cls.model).filter_by(id=id))
        await session.commit()
