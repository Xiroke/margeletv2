from typing import Annotated, AsyncGenerator

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from config import settings


class Base(DeclarativeBase):
    pass


if settings.TEST_MODE:
    from sqlalchemy.pool import NullPool

    engine = create_async_engine(settings.TEST_DB_URL, poolclass=NullPool)
else:
    engine = create_async_engine(settings.DB_URL)

async_session_maker = async_sessionmaker(engine, expire_on_commit=False)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session


async_session = Annotated[AsyncSession, Depends(get_async_session)]


async def create_db_and_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


__all__ = ["get_async_session", "async_session", "create_db_and_tables", "Base"]
