from typing import Protocol, cast
from uuid import UUID

from sqlalchemy import select

from src.core.abstract.dao import DaoProtocol, SqlDaoImpl
from src.entries.auth.refresh_token.models import RefreshTokenModel
from src.entries.auth.user.models import UserModel
from src.entries.auth.user.schemas import (
    CreateUserSchema,
    ReadUserSchema,
    UpdateUserSchema,
)
from src.utils.exceptions import ModelNotFoundException


class UserDaoProtocol(
    DaoProtocol[
        UserModel,
        UUID,
        ReadUserSchema,
        CreateUserSchema,
        UpdateUserSchema,
    ],
    Protocol,
):
    async def get_user_by_email(self, email: str) -> ReadUserSchema: ...
    async def get_user_for_check_password(self, email: str) -> UserModel: ...
    async def get_user_by_token(self, token: str) -> ReadUserSchema: ...


class UserSqlDao(
    SqlDaoImpl[
        UserModel,
        UUID,
        ReadUserSchema,
        CreateUserSchema,
        UpdateUserSchema,
    ]
):
    async def get_user_by_email(self, email: str) -> ReadUserSchema:
        result = await self.session.execute(
            select(self.model_type).filter_by(email=email)
        )

        record = result.scalar_one_or_none()

        if record is None:
            raise ModelNotFoundException(self.model_type.__name__, str(id))

        return self.read_schema_type.model_validate(record)

    async def get_user_for_check_password(self, email: str) -> UserModel:
        result = await self.session.execute(
            select(self.model_type).filter_by(email=email)
        )

        record = result.scalar_one_or_none()

        if record is None:
            raise ModelNotFoundException(self.model_type.__name__, str(id))

        return cast(UserModel, record)

    async def get_user_by_token(self, token: str) -> ReadUserSchema:
        result = await self.session.execute(
            select(self.model_type)
            .join(RefreshTokenModel, RefreshTokenModel.user_id == self.model_type.id)
            .filter(RefreshTokenModel.value == token)
        )

        record = result.scalar_one_or_none()

        if record is None:
            raise ModelNotFoundException(self.model_type.__name__, str(id))

        return self.read_schema_type.model_validate(record)
