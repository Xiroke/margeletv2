from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.db.database import get_async_session

from .dao import RefreshTokenDaoProtocol, RefreshTokenSqlDao


def get_user_dao(
    session: Annotated[AsyncSession, Depends(get_async_session)],
) -> RefreshTokenDaoProtocol:
    return RefreshTokenSqlDao(session)


RefreshTokenDaoDep = Annotated[RefreshTokenDaoProtocol, Depends(get_user_dao)]

__all__ = ["RefreshTokenDaoDep"]
