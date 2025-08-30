from src.core.abstract.service_proxy_dao import ProxyServiceToDao

from .dao import RoleDaoProtocol


class RoleService(ProxyServiceToDao):
    def __init__(
        self,
        dao: RoleDaoProtocol,
    ):
        self.dao = dao
