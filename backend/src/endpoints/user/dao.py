from abc import ABC

from src.core.abstract.dao_base import DaoBase, SqlDaoBaseDefault

from .models import UserModel


class UserDaoBase[M](DaoBase[M], ABC):
    pass


class UserSqlDao(SqlDaoBaseDefault[UserModel], UserDaoBase[UserModel]):
    model = UserModel
