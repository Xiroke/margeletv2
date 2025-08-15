from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.db.database import get_async_session
from src.infrastructure.s3 import S3ServiceDep

from .dao import UserDaoProtocol, UserSqlDao
from .service import UserService


def get_user_dao(
    session: Annotated[AsyncSession, Depends(get_async_session)],
) -> UserDaoProtocol:
    return UserSqlDao(session)


UserDaoDep = Annotated[UserDaoProtocol, Depends(get_user_dao)]


def get_user_service(
    dao: UserDaoDep,
    storage: S3ServiceDep,
) -> UserService:
    return UserService(dao, storage)


UserServiceDep = Annotated[UserService, Depends(get_user_service)]


__all__ = ["UserDaoDep", "UserServiceDep"]
