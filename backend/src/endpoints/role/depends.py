from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.db.database import get_async_session
from src.endpoints.role.dao import RoleSqlDao

from .service import RoleService


def get_role_dao(session: Annotated[AsyncSession, Depends(get_async_session)]):
    return RoleSqlDao(session)


RoleDaoDep = Annotated[RoleSqlDao, Depends(get_role_dao)]


def get_role_service(
    dao: RoleDaoDep,
) -> RoleService:
    return RoleService(dao)


RoleServiceDep = Annotated[RoleService, Depends(get_role_service)]

__all__ = ["RoleDaoDep", "RoleServiceDep"]
