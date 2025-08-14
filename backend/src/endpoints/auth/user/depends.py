from typing import Annotated

from fastapi import Depends
from fastapi_users_db_sqlalchemy import SQLAlchemyUserDatabase
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.db.database import get_async_session
from src.endpoints.auth.user.models import UserModel
from src.infrastructure.s3 import s3_service_factory

from .dao import UserDaoProtocol, UserSqlDao
from .service import UserService


async def get_user_db(session: Annotated[AsyncSession, Depends(get_async_session)]):
    yield SQLAlchemyUserDatabase(session, UserModel)


def get_user_dao(session: Annotated[AsyncSession, Depends(get_async_session)]):
    return UserSqlDao(session)


user_dao_factory = Annotated[UserDaoProtocol, Depends(get_user_dao)]


def get_user_service(
    dao: user_dao_factory,
    storage: s3_service_factory,
) -> UserService:
    return UserService(dao, storage)


user_service_factory = Annotated[UserService, Depends(get_user_service)]


__all__ = ["user_dao_factory", "user_service_factory"]
