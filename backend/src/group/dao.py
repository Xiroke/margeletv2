from src.db.dao_base import DAOBase
from src.db.models import GroupModel


class GroupDAO(DAOBase):
    model = GroupModel
