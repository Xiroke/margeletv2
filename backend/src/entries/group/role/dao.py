from typing import Protocol

from src.core.abstract.dao import DaoProtocol, SqlDaoImpl

from .models import RoleModel
from .schemas import CreateRoleSchema, ReadRoleSchema, UpdateRoleSchema


class RoleDaoProtocol(
    DaoProtocol[RoleModel, int, ReadRoleSchema, CreateRoleSchema, UpdateRoleSchema],
    Protocol,
):
    pass


class RoleSqlDao(
    SqlDaoImpl[RoleModel, int, ReadRoleSchema, CreateRoleSchema, UpdateRoleSchema]
):
    pass
