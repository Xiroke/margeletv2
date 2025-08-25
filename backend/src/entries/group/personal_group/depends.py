from src.entries.group.personal_group.dao import PersonalGroupSqlDao
from src.utils.depends import get_sql_dao_dep

PersonalGroupDaoDep = get_sql_dao_dep(PersonalGroupSqlDao)

PersonalGroupDaoService = PersonalGroupDaoDep
