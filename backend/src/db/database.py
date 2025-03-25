from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from config import DB_URL
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


engine = create_async_engine(DB_URL)

async_session_maker = async_sessionmaker(engine, expire_on_commit=False)


async def get_async_session():
    with async_session_maker() as session:
        yield session
