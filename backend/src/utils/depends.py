from typing import Any

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer

from src.core.abstract.dao.sql_impl import SqlDaoImpl
from src.core.db.database import async_session

# This is used only for authorize in docs page
Oauth2SchemeDep = OAuth2PasswordBearer(
    tokenUrl="auth/token",
    scheme_name="access_token",
)


def get_sql_dao_dep[T: SqlDaoImpl[Any, Any, Any, Any, Any]](
    dao_class: type[T],
) -> Any:
    """
    Creates a depends dao

    Example:
        GroupDaoDep = Annotated[
            GroupSqlDao, get_sql_dao_dep(GroupSqlDao)
        ]
    """

    async def _get_dao(session: async_session) -> T:
        return dao_class(session)

    return Depends(_get_dao)


__all__ = ["Oauth2SchemeDep"]
