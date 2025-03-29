from src.db.dao_base import DAOBase
from .models import RoleGroupModel


class RoleGroupDAO(DAOBase):
    model = RoleGroupModel
