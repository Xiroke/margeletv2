from typing import Annotated

from fastapi import Depends

from src.utils.depends import get_sql_dao_dep

from .dao import RoleDaoProtocol, RoleSqlDao
from .service import RoleService

RoleDaoDep = Annotated[RoleSqlDao, get_sql_dao_dep(RoleSqlDao)]


def get_role_service(
    dao: RoleDaoDep,
) -> RoleService:
    return RoleService(dao)


RoleServiceDep = Annotated[RoleService | RoleDaoProtocol, Depends(get_role_service)]


__all__ = ["RoleDaoDep", "RoleServiceDep"]
