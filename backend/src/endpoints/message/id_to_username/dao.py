from src.core.abstract.dao_base import DaoBase, MongoDaoBaseDefault

from .models import IdToUsername


class IdToUsernameDaoBase(DaoBase[IdToUsername]):
    """Abstract class for IdToUsernameDao"""

    pass


class IdToUsernameDao(MongoDaoBaseDefault[IdToUsername], IdToUsernameDaoBase):
    "Implementation previous abstract class"

    pass
