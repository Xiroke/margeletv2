from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.db.database import get_async_session
from src.endpoints.role.dao import RoleSqlDao

from .service import RoleService


def get_role_dao(session: Annotated[AsyncSession, Depends(get_async_session)]):
    return RoleSqlDao(session)


role_dao_factory = Annotated[RoleSqlDao, Depends(get_role_dao)]


def get_role_service(
    dao: role_dao_factory,
) -> RoleService:
    return RoleService(dao)


role_service_factory = Annotated[RoleService, Depends(get_role_service)]

__all__ = ["role_dao_factory", "role_service_factory"]
