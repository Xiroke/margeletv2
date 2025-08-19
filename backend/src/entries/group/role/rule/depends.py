from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.db.database import get_async_session
from src.entries.group.role.rule.service import RuleService

from .dao import RuleDaoProtocol, RuleSqlDao


def get_rule_dao(session: Annotated[AsyncSession, Depends(get_async_session)]):
    return RuleSqlDao(session)


RuleDaoDep = Annotated[RuleDaoProtocol, Depends(get_rule_dao)]


def get_rule_service(dao: RuleDaoDep):
    return RuleService(dao)


RuleServiceDep = Annotated[RuleDaoProtocol, Depends(get_rule_service)]
