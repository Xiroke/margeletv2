from typing import Annotated

from fastapi import Depends

from src.entries.group.role.rule.service import RuleService
from src.utils.depends import get_sql_dao_dep

from .dao import RuleDaoProtocol, RuleSqlDao

RuleDaoDep = get_sql_dao_dep(RuleSqlDao)


def get_rule_service(dao: RuleDaoDep):
    return RuleService(dao)


RuleServiceDep = Annotated[RuleDaoProtocol, Depends(get_rule_service)]
