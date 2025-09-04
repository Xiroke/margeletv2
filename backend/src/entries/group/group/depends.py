from src.utils.depends import get_sql_dao_dep

from .dao import GroupSqlDao

GroupDaoDep = get_sql_dao_dep(GroupSqlDao)

GroupServiceDep = GroupDaoDep

__all__ = ["GroupServiceDep", "GroupServiceDep"]
