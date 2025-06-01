from typing import Protocol

from src.core.abstract.dao_base import DaoProtocol, SqlDaoImpl
from src.endpoints.user.models import UserModel
from src.endpoints.user.schemas import (
    CreateUserSchema,
    ReadUserSchema,
    UpdateUserSchema,
)


class UserDaoProtocol(
    DaoProtocol[UserModel, ReadUserSchema, CreateUserSchema, UpdateUserSchema], Protocol
):
    pass


class UserSqlDao(
    SqlDaoImpl[UserModel, ReadUserSchema, CreateUserSchema, UpdateUserSchema]
):
    pass
