from typing import Annotated, AsyncGenerator

from fastapi import Depends
from fastapi_users_db_sqlalchemy.access_token import SQLAlchemyAccessTokenDatabase
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.database import get_async_session

from .models import TokenModel


async def get_refresh_token_db(
    session: Annotated[AsyncSession, Depends(get_async_session)],
) -> AsyncGenerator[SQLAlchemyAccessTokenDatabase, None]:
    """return dao for refresh token"""
    yield SQLAlchemyAccessTokenDatabase(session, TokenModel)
