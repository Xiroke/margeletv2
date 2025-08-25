from src.utils.depends import get_sql_dao_dep

from .dao import RefreshTokenSqlDao

RefreshTokenDaoDep = get_sql_dao_dep(RefreshTokenSqlDao)

__all__ = ["RefreshTokenDaoDep"]
