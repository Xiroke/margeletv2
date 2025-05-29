from typing import Annotated, AsyncGenerator

from fastapi import Depends
from fastapi_users.authentication.strategy.db import (
    AccessTokenDatabase,
    DatabaseStrategy,
)
from fastapi_users_db_sqlalchemy.access_token import SQLAlchemyAccessTokenDatabase
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.db.database import get_async_session

from .models import TokenModel


async def get_refresh_token_db(
    session: Annotated[AsyncSession, Depends(get_async_session)],
) -> AsyncGenerator[SQLAlchemyAccessTokenDatabase, None]:
    """return dao for refresh token"""
    yield SQLAlchemyAccessTokenDatabase(session, TokenModel)


def get_database_strategy(
    access_token_db: Annotated[
        AccessTokenDatabase[TokenModel], Depends(get_refresh_token_db)
    ],
) -> DatabaseStrategy:
    return DatabaseStrategy(access_token_db, lifetime_seconds=60 * 60 * 24 * 24)
