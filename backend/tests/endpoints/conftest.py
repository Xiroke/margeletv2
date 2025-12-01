import sys

import pytest_asyncio
from httpx import ASGITransport, AsyncClient

sys.path.append("./")

from config import settings
from main import app
from src.core.db.database import Base, async_session_maker, engine

assert settings.TEST_MODE


@pytest_asyncio.fixture
async def client() -> AsyncClient:
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as c:
        yield c


@pytest_asyncio.fixture(scope="function")
async def setup_database():
    async with engine.connect() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
        await conn.flush()

    yield

    async with engine.connect() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.flush()


@pytest_asyncio.fixture(scope="function")
async def session(setup_database):
    async with async_session_maker() as session:
        yield session
