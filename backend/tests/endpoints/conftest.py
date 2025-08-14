import sys

import pytest_asyncio
from httpx import ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

sys.path.append("./")

from config import settings
from main import app
from src.core.db.database import Base, async_session_maker, engine
from src.core.db.models import GroupModel

assert settings.TEST_MODE


@pytest_asyncio.fixture
async def client() -> AsyncClient:
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as c:
        yield c


@pytest_asyncio.fixture(scope="function", autouse=True)
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


@pytest_asyncio.fixture(scope="function")
async def authorization(session: AsyncSession):
    group = GroupModel(title="Test group")
    session.add(group)
    await session.flush()
    await session.refresh(group)

    yield group


@pytest_asyncio.fixture(scope="function")
async def group(session: AsyncSession):
    group = GroupModel(title="Test group")
    session.add(group)
    await session.flush()
    await session.refresh(group)

    yield group


# @pytest_asyncio.fixture(scope="function")
# async def s3():
#     s3 = s3_bucket_service_factory()
#     yield s3


# @pytest_asyncio.fixture(scope="function")
# async def chat(session: AsyncSession, group: GroupModel):
#     chat = ChatModel(title="Test chat", group_id=group.id)
#     session.add(chat)
#     await session.flush()
#     await session.refresh(chat)
#     yield chat


# @pytest_asyncio.fixture(scope="function")
# async def personal_chat(session: AsyncSession):
#     personal_chat = PersonalChatModel(title="Test personal chat")
#     session.add(personal_chat)
#     await session.flush()
#     await session.refresh(personal_chat)
#     yield personal_chat


# @pytest_asyncio.fixture(scope="function")
# async def role_group(session: AsyncSession, group: GroupModel):
#     role_group = RoleModel(title="Test role group", group_id=group.id)
#     session.add(role_group)
#     await session.flush()
#     await session.refresh(role_group)
#     yield role_group
