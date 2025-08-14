from typing import Protocol
from uuid import UUID

from src.core.abstract.dao import DaoProtocol, SqlDaoImpl
from src.endpoints.auth.user.models import UserModel
from src.endpoints.auth.user.schemas import (
    BaseUserSchema,
    CreateUserSchema,
    ReadUserSchema,
    UpdateUserSchema,
)


class UserDaoProtocol(
    DaoProtocol[
        UserModel,
        UUID,
        BaseUserSchema,
        ReadUserSchema,
        CreateUserSchema,
        UpdateUserSchema,
    ],
    Protocol,
):
    pass


class UserSqlDao(
    SqlDaoImpl[
        UserModel,
        UUID,
        BaseUserSchema,
        ReadUserSchema,
        CreateUserSchema,
        UpdateUserSchema,
    ]
):
    pass
