from src.core.abstract.service import DaoService

from .dao import RoleDaoProtocol


class RoleService(DaoService):
    def __init__(
        self,
        dao: RoleDaoProtocol,
    ):
        self.dao = dao
