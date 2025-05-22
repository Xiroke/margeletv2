from src.core.abstract.dao_base import DaoBase

from .models import RoleGroupModel


class RoleGroupDao(DaoBase):
    model = RoleGroupModel
