from sqlalchemy.ext.asyncio import AsyncSession

from src.entries.group.role.rule.dao import RuleSqlDao
from src.entries.group.role.rule.enums import RuleEnum
from src.entries.group.role.rule.schemas import RuleCreate


async def seed_rule(session: AsyncSession):
    dao = RuleSqlDao(session)

    for rule in RuleEnum:
        await dao.create(RuleCreate(id=rule.value))
