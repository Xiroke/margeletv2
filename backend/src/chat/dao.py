from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import joinedload


from src.db.dao_base import DAOBase
from src.db.models import UserModel, GroupModel, UserToGroupModel
from .models import ChatModel


class ChatDAO(DAOBase):
    model = ChatModel

    @classmethod
    async def get_all_chats_by_user(cls, session: AsyncSession, user_id: UUID):
        """
        Using in websocket, when user connect to add user in all chats
        """
        result = await session.execute(
            select(cls.model.id)
            .select_from(cls.model)
            .join(cls.model.group)
            .join(UserToGroupModel, GroupModel.id == UserToGroupModel.c.group_id)
            .filter(UserToGroupModel.c.user_id == user_id)
        )
        return result.scalars().all()
