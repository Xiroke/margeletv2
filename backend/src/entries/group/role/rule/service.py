from src.core.abstract.service import DaoService

from .dao import RuleDaoProtocol


class RuleService(DaoService, RuleDaoProtocol):
    def __init__(
        self,
        dao: RuleDaoProtocol,
    ):
        self.dao = dao
