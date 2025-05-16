from uuid import UUID

from sqlalchemy import and_, insert, select
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.dao_base import DAOBase
from src.db.models import UserToGroupModel

from .models import GroupModel


class GroupDAO(DAOBase):
    model = GroupModel

    @classmethod
    async def create(cls, session, obj, user_id: UUID):
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
            .join(
                UserToGroupModel,
                and_(
                    UserToGroupModel.c.group_id == GroupModel.id,
                    UserToGroupModel.c.user_id == user_id,
                ),
            )
            .filter(UserToGroupModel.c.user_id == user_id)
        )
        return groups.scalars().all()

    @classmethod
    async def is_user_in_group(cls, session: AsyncSession, user_id, group_id):
        result = await session.execute(
            select(UserToGroupModel)
            .filter(UserToGroupModel.c.user_id == user_id)
            .filter(UserToGroupModel.c.group_id == group_id)
        )
        return result.scalars().one_or_none()

    @classmethod
    async def add_user_to_group(cls, session: AsyncSession, group_id, user_id):
        await session.execute(
            insert(UserToGroupModel).values(group_id=group_id, user_id=user_id)
        )
        await session.commit()
