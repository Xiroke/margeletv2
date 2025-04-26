from src.no_sql_db.dao_base import NoSqlDAOBase

from .no_sql_models import IdToUsername


class IdToUsernameDAO(NoSqlDAOBase[IdToUsername]):
    model = IdToUsername
