from src.db.dao_base import DAOBase
from .models import TokenModel


class TokenDAO(DAOBase):
    model = TokenModel
