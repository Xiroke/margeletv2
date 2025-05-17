from src.db.dao_base import SQLAlchemyDAO
from src.group.models import GroupModel


class GroupDAO(SQLAlchemyDAO[GroupModel]):
    pass
