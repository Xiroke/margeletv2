from typing import TYPE_CHECKING
from uuid import UUID

from src.core.abstract.service_base import DaoService
from src.core.abstract.storage_base import StorageBase
from src.endpoints.chat.models import ChatModel
from src.endpoints.chat.schemas import (
    CreateChatSchema,
    ReadChatSchema,
    UpdateChatSchema,
)

from .dao import ChatDaoProtocol


class ChatService(
    DaoService[ChatModel, ReadChatSchema, CreateChatSchema, UpdateChatSchema]
):
    def __init__(
        self,
        dao: ChatDaoProtocol,
        storage_service: StorageBase,
    ):
        self.storage_service = storage_service

        if TYPE_CHECKING:
            self.dao = dao

        super().__init__(dao)

    async def get_chats_by_user(self, user_id: UUID) -> list[ReadChatSchema]:
        return await self.dao.get_chats_by_user(user_id)

    async def get_chats_by_group(self, group_id: UUID) -> list[ReadChatSchema]:
        return await self.dao.get_chats_by_group(group_id)
