from src.no_sql_db.dao_base import NoSqlDAOBase
from .no_sql_models import MessageModel


class MessageDAO(NoSqlDAOBase[MessageModel]):
    model = MessageModel
