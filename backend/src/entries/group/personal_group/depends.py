from typing import Annotated

from src.entries.group.personal_group.dao import PersonalGroupSqlDao
from src.utils.depends import get_sql_dao_dep

PersonalGroupDaoDep = Annotated[
    PersonalGroupSqlDao, get_sql_dao_dep(PersonalGroupSqlDao)
]

PersonalGroupServiceDep = PersonalGroupDaoDep


__all__ = ["PersonalGroupServiceDep", "PersonalGroupServiceDep"]
