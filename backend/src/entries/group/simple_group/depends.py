from typing import Annotated

from fastapi import Depends

from src.entries.group.role.rule.depends import RuleDaoDep
from src.entries.group.simple_group.service import SimpleGroupService
from src.infrastructure.s3.depends import S3ServiceDep
from src.utils.depends import get_sql_dao_dep

from .dao import SimpleGroupDaoProtocol, SimpleGroupSqlDao

SimpleGroupDaoDep = get_sql_dao_dep(SimpleGroupSqlDao)


def get_simple_group_service(
    dao: SimpleGroupDaoDep, rule_dao: RuleDaoDep, storage: S3ServiceDep
):
    return SimpleGroupService(dao, rule_dao, storage)


SimpleGroupServiceDep = Annotated[
    SimpleGroupService | SimpleGroupDaoProtocol, Depends(get_simple_group_service)
]

__all__ = ["SimpleGroupDaoDep", "SimpleGroupServiceDep"]
