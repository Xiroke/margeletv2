from src.core.abstract.dao_base import DaoBase, SqlDaoBaseDefault

from .models import UserModel


class UserDaoBase[SM](DaoBase[SM]):
    pass


class UserSqlDao(SqlDaoBaseDefault[UserModel]):
    model = UserModel
