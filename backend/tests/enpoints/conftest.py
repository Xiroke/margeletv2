import pytest_asyncio
from sqlalchemy.ext.asyncio import AsyncSession

import sys

sys.path.append("./")
from src.db.database import Base, engine, async_session_maker
from src.db.models import GroupModel, ChatModel, PersonalChatModel, RoleGroupModel


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
    group = GroupModel(title="Test group")
    session.add(group)
    await session.commit()
    await session.refresh(group)

    yield group


@pytest_asyncio.fixture(scope="function")
async def chat(session: AsyncSession, group: GroupModel):
    chat = ChatModel(title="Test chat", group_id=group.id)
    session.add(chat)
    await session.commit()
    await session.refresh(chat)
    yield chat


@pytest_asyncio.fixture(scope="function")
async def personal_chat(session: AsyncSession):
    personal_chat = PersonalChatModel(title="Test personal chat")
    session.add(personal_chat)
    await session.commit()
    await session.refresh(personal_chat)
    yield personal_chat


@pytest_asyncio.fixture(scope="function")
async def role_group(session: AsyncSession, group: GroupModel):
    role_group = RoleGroupModel(title="Test role group", group_id=group.id)
    session.add(role_group)
    await session.commit()
    await session.refresh(role_group)
    yield role_group
