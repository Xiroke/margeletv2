from src.utils.depends import get_sql_dao_dep

from .dao import SimpleGroupSqlDao

SimpleGroupDaoDep = get_sql_dao_dep(SimpleGroupSqlDao)

SimpleGroupServiceDep = SimpleGroupDaoDep

__all__ = ["SimpleGroupServiceDep", "SimpleGroupServiceDep"]
