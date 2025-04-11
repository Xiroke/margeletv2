from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import insert

from src.db.dao_base import DAOBase
from src.db.models import UserToGroupModel
from .models import GroupModel


class GroupDAO(DAOBase):
    model = GroupModel

    @classmethod
    async def add_user_to_group(cls, session: AsyncSession, group_id, user_id):
        await session.execute(
            insert(UserToGroupModel).values(group_id=group_id, user_id=user_id)
        )
        await session.commit()
