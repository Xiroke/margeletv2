from typing import Annotated

from src.utils.depends import get_sql_dao_dep

from .dao import RefreshTokenSqlDao

RefreshTokenDaoDep = Annotated[RefreshTokenSqlDao, get_sql_dao_dep(RefreshTokenSqlDao)]

__all__ = ["RefreshTokenDaoDep"]
