from typing import Type

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import update, select, delete

from .database import Base


class DAOBase:
    model: Type[Base]

    @classmethod
    async def get_one_by_field(cls, session: AsyncSession, **filter):
        result = await session.execute(select(cls.model).filter_by(**filter))
        return result.scalars().one()

    @classmethod
    async def get_one_or_none_by_field(cls, session: AsyncSession, **filter):
        result = await session.execute(select(cls.model).filter_by(**filter))
        return result.scalars().one_or_none()

    @classmethod
    async def get_all_by_field(cls, session: AsyncSession, **filter):
        result = await session.execute(select(cls.model).filter_by(**filter))
        return result.scalars().all()

    @classmethod
    async def get_all(cls, session: AsyncSession):
        result = await session.execute(select(cls.model))
        return result.scalars().all()

    @classmethod
    async def create(cls, session: AsyncSession, obj: Type[Base]):
        session.add(obj)
        await session.commit()
        await session.refresh(obj)
        return obj

    @classmethod
    async def update(cls, session: AsyncSession, obj: dict, **filter):
        await session.execute(update(cls.model).filter_by(**filter).values(**obj))
        await session.commit()

    @classmethod
    async def delete(cls, session: AsyncSession, id):
        await session.execute(delete(cls.model).filter_by(id=id))
        await session.commit()
