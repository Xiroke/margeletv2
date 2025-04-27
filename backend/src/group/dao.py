from uuid import UUID

from sqlalchemy import insert, select
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.dao_base import DAOBase
from src.db.models import UserToGroupModel

from .models import GroupModel


class GroupDAO(DAOBase):
    model = GroupModel

    @classmethod
    async def create(cls, session, obj: GroupModel, user_id: UUID):
        session.add(obj)

        await session.flush()

        await session.execute(
            insert(UserToGroupModel).values(group_id=obj.id, user_id=user_id)
        )
        await session.commit()
        await session.refresh(obj)
        return obj

    @classmethod
    async def get_user_groups(cls, session: AsyncSession, user_id):
        groups = await session.execute(
            select(GroupModel)
            .join(UserToGroupModel, UserToGroupModel.c.group_id == GroupModel.id)
            .filter(UserToGroupModel.c.user_id == user_id)
        )
        return groups.scalars().all()
