from typing import Protocol

from src.core.abstract.dao import DaoProtocol, SqlDaoImpl

from .models import RoleModel
from .schemas import RoleCreate, RoleRead, RoleUpdate


class RoleDaoProtocol(
    DaoProtocol[RoleModel, int, RoleRead, RoleCreate, RoleUpdate],
    Protocol,
):
    pass


class RoleSqlDao(SqlDaoImpl[RoleModel, int, RoleRead, RoleCreate, RoleUpdate]):
    pass
