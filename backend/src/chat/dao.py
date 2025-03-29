from src.db.dao_base import DAOBase
from .models import ChatModel


class ChatDAO(DAOBase):
    model = ChatModel
