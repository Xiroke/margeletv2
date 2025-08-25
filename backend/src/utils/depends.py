from typing import Annotated, Any

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer

from src.core.abstract.dao.sql_impl import SqlDaoImpl
from src.core.db.database import async_session

# This is used only for authorize in docs page
Oauth2SchemeDep = OAuth2PasswordBearer(
    tokenUrl="auth/token",
    scheme_name="access_token",
)


def get_sql_dao_dep(dao_class: type[SqlDaoImpl[Any, Any, Any, Any, Any]]):
    async def _get_dao(session: async_session):
        return dao_class(session)

    return Annotated[dao_class, Depends(_get_dao)]


__all__ = ["Oauth2SchemeDep"]
