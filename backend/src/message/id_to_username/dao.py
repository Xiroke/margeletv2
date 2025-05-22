from src.no_sql_db.dao_base import NoSqlDaoBaseBase

from .no_sql_models import IdToUsername


class IdToUsernameDao(NoSqlDaoBaseBase[IdToUsername]):
    model = IdToUsername
