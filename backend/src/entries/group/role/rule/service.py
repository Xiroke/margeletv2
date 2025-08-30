from src.core.abstract.service_proxy_dao import ProxyServiceToDao

from .dao import RuleDaoProtocol


class RuleService(ProxyServiceToDao):
    def __init__(
        self,
        dao: RuleDaoProtocol,
    ):
        self.dao = dao
