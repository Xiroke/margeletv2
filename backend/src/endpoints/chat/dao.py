from typing import Protocol
from uuid import UUID

from sqlalchemy import select

from src.core.abstract.dao import DaoProtocol, SqlDaoImpl
from src.core.db.models.secondary_models.models import UserToGroupModel
from src.endpoints.chat.models import ChatModel
from src.endpoints.chat.schemas import (
    CreateChatSchema,
    ReadChatSchema,
    UpdateChatSchema,
)
from src.endpoints.group.models import GroupModel


class ChatDaoProtocol(
    DaoProtocol[UUID, ChatModel, ReadChatSchema, CreateChatSchema, UpdateChatSchema],
    Protocol,
):
    async def get_chats_by_user(self, user_id: UUID) -> list[ReadChatSchema]: ...

    async def get_chats_by_group(self, group_id: UUID) -> list[ReadChatSchema]: ...


class ChatSqlDao(
    SqlDaoImpl[UUID, ChatModel, ReadChatSchema, CreateChatSchema, UpdateChatSchema],
):
    async def get_chats_by_user(self, user_id: UUID) -> list[ReadChatSchema]:
        result = await self.session.execute(
            select(ChatModel)
            .join(UserToGroupModel, UserToGroupModel.c.user_id == user_id)
            .join(GroupModel, GroupModel.id == UserToGroupModel.c.group_id)
            .filter(ChatModel.group_id == GroupModel.id)
        )
        return [ReadChatSchema.model_validate(i) for i in result.scalars().all()]

    async def get_chats_by_group(self, group_id: UUID) -> list[ReadChatSchema]:
        result = await self.session.execute(
            select(ChatModel).filter(ChatModel.group_id == group_id)
        )
        return [ReadChatSchema.model_validate(i) for i in result.scalars().all()]
