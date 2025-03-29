from src.db.dao_base import DAOBase
from .models import PersonalChatModel


class PersonalChatDAO(DAOBase):
    model = PersonalChatModel
