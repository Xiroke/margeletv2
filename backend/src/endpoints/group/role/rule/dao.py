from typing import Any, Protocol

from src.core.abstract.dao import DaoProtocol, SqlDaoImpl

from .models import RuleModel
from .schemas import CreateRuleSchema, ReadRuleSchema


class RuleDaoProtocol(
    DaoProtocol[RuleModel, int, ReadRuleSchema, CreateRuleSchema, Any],
    Protocol,
):
    pass


class RuleSqlDao(SqlDaoImpl[RuleModel, int, ReadRuleSchema, CreateRuleSchema, Any]):
    pass
