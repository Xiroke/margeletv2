from typing import TYPE_CHECKING

from src.core.abstract.service import DaoService

from .dao import RuleDaoProtocol


class RuleService(DaoService, RuleDaoProtocol):
    def __init__(
        self,
        dao: RuleDaoProtocol,
    ):
        if TYPE_CHECKING:
            self.dao = dao

        super().__init__(dao)
