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
    """
    Creates a depends dao

    Example:
        UserDaoDep = get_sql_dao_dep(UserSqlDao)
    """

    async def _get_dao(session: async_session):
        return dao_class(session)

    return Annotated[dao_class, Depends(_get_dao)]


# def get_dao_service_dep(
#     service_class: type[DaoService],
#     dao_class: type[SqlDaoImpl[Any, Any, Any, Any, Any]],
# ):
#     """Creating a simple dependency where the 'service' accepts only the 'dao'"""

#     async def _get_service_dao():
#         dao = get_sql_dao_dep(dao_class)
#         return service_class(dao)

#     return Depends(_get_service_dao)


__all__ = ["Oauth2SchemeDep"]
