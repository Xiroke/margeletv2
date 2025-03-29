import pytest_asyncio
from dotenv import set_key, get_key
from sqlalchemy.ext.asyncio import AsyncSession


import sys

sys.path.append("./")
from src.db.database import Base, engine, async_session_maker


@pytest_asyncio.fixture(scope="function", autouse=True)
async def setup_database():
    async with engine.connect() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
        await conn.commit()

    yield

    async with engine.connect() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.commit()


# @pytest_asyncio.fixture(scope="function")
# async def session_maker(setup_database):
#     yield async_sessionmaker(setup_database, expire_on_commit=False)


@pytest_asyncio.fixture(scope="function")
async def session(setup_database):
    async with async_session_maker() as session:
        yield session


@pytest_asyncio.fixture(scope="function")
async def group(session: AsyncSession):
    from src.group.models import GroupModel

    group = GroupModel(title="Test group")
    session.add(group)
    await session.commit()
    await session.refresh(group)

    yield group
