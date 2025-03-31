from src.db.dao_base import DAOBase
from .models import UserModel


class UserDAO(DAOBase):
    model = UserModel
