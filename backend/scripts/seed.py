import asyncio
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parent.parent))

# all the imports below are important
import config  # noqa: F401
from src.core.db.database import async_session_maker
from src.core.db.models import *
from src.entries.group.role.rule.seed import seed_rule


async def main():
    async with async_session_maker() as session:
        await seed_rule(session)
        await session.commit()


asyncio.run(main())
