from typing import Any, Protocol
from uuid import UUID

from src.core.abstract.dao import DaoProtocol, SqlDaoImpl

from .models import RefreshTokenModel
from .schemas import ReadRefreshTokenSchema


class RefreshTokenDaoProtocol(
    DaoProtocol[
        RefreshTokenModel,
        UUID,
        ReadRefreshTokenSchema,
        Any,
        Any,
    ],
    Protocol,
):
    pass


class RefreshTokenSqlDao(
    SqlDaoImpl[RefreshTokenModel, UUID, ReadRefreshTokenSchema, Any, Any]
):
    pass
