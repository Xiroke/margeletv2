from typing import Annotated

from fastapi import Depends

from src.infrastructure.s3 import S3ServiceDep
from src.utils.depends import get_sql_dao_dep

from .dao import UserDaoProtocol, UserSqlDao
from .service import UserService

UserDaoDep = get_sql_dao_dep(UserSqlDao)


def get_user_service(
    dao: UserDaoDep,
    storage: S3ServiceDep,
) -> UserService:
    return UserService(dao, storage)


UserServiceDep = Annotated[UserService | UserDaoProtocol, Depends(get_user_service)]


__all__ = ["UserDaoDep", "UserServiceDep"]
