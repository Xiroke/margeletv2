from src.db.dao_base import DAOBase
from .models import GroupModel


class GroupDAO(DAOBase):
    model = GroupModel
