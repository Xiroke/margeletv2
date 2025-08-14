from typing import Annotated, AsyncGenerator

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from config import settings


class Base(DeclarativeBase):
    # if TYPE_CHECKING:
    #     id: Mapped[int | UUID]

    pass


if settings.TEST_MODE:
    from sqlalchemy.pool import NullPool

    engine = create_async_engine(settings.sqldb.TEST_URL, poolclass=NullPool)
else:
    engine = create_async_engine(settings.sqldb.URL)

async_session_maker = async_sessionmaker(engine, expire_on_commit=False)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        try:
            yield session
            await session.commit()
        except Exception as e:
            await session.rollback()
            raise e


async_session = Annotated[AsyncSession, Depends(get_async_session)]


async def create_db_and_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


__all__ = ["get_async_session", "async_session", "create_db_and_tables", "Base"]
