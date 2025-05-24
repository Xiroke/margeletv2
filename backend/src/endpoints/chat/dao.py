from abc import abstractmethod
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.abstract.dao_base import DaoBase, SqlDaoBaseDefault
from src.core.db.models.secondary_models.models import UserToGroupModel
from src.endpoints.group.models import GroupModel

from .models import ChatModel


class ChatDaoBase[SM](DaoBase[SM]):
    @abstractmethod
    async def get_all_chats_by_user(self, id) -> list[SM]:
        pass


class SqlChatDao(SqlDaoBaseDefault[ChatModel], ChatDaoBase[ChatModel]):
    def __init__(self, session: AsyncSession, model: type[ChatModel]):
        super().__init__(session, model)

    async def get_all_chats_by_user(self, id: UUID):
        """
        Using in websocket, when user connect to add user in all chats
        """
        result = await self.session.execute(
            select(self.model.id)
            .select_from(self.model)
            .join(self.model.group)
            .join(UserToGroupModel, GroupModel.id == UserToGroupModel.c.group_id)
            .filter(UserToGroupModel.c.user_id == id)
        )
        return result.scalars().all()
