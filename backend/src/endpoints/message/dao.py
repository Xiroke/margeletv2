from src.core.abstract.dao_base import DaoBase, MongoDaoBaseDefault

from .models import MessageModel


class MessageDaoBase[D](DaoBase[D]):
    pass


class MessageMongoDao(MongoDaoBaseDefault[MessageModel], MessageDaoBase[MessageModel]):
    pass
