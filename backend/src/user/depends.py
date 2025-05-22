from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.users import fastapi_users
from src.core.db.database import get_async_session
from src.infrastructure.s3 import s3_service_factory
from src.user.models import UserModel
from src.user.permissions import UserPermissionDao

from .dao import UserSqlDao
from .service import UserService

current_active_user = fastapi_users.current_user(active=True)

current_active_user_factory = Annotated[UserModel, Depends(current_active_user)]


def get_user_dao(session: Annotated[AsyncSession, Depends(get_async_session)]):
    return UserSqlDao(session, model=UserModel)


user_dao_factory = Annotated[UserSqlDao, Depends(get_user_dao)]


def get_user_permission(dao: user_dao_factory):
    return UserPermissionDao(dao, UserModel)


user_permission_factory = Annotated[UserPermissionDao, Depends(get_user_permission)]


def get_user_service(
    dao: user_dao_factory,
    storage: s3_service_factory,
    permission: user_permission_factory,
) -> UserService:
    return UserService(dao, storage, permission)


user_service_factory = Annotated[UserService, Depends(get_user_service)]
