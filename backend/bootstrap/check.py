from sqlalchemy import select

from src.core.db.database import async_session_maker
from src.entries.group.role.rule.models import RuleModel


async def is_rule_exists() -> bool:
    """`uv run scripts/seed.py` to solve"""
    async with async_session_maker() as session:
        result = await session.execute(select(RuleModel.id).limit(1))
        status = bool(result.scalars().first())

    return status


async def run_checks() -> None:
    assert await is_rule_exists()
