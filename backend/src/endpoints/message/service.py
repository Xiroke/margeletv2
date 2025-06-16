from typing import TYPE_CHECKING
from uuid import UUID

from src.core.abstract.service_base import DaoService
from src.core.abstract.storage_base import StorageBase
from src.endpoints.message.dao import MessageDaoProtocol
from src.endpoints.message.schemas import (
    CreateMessageSchema,
    ReadMessageSchema,
    UpdateMessageSchema,
)

from .models import MessageModel


class MessageService(
    DaoService[
        MessageModel, ReadMessageSchema, CreateMessageSchema, UpdateMessageSchema
    ]
):
    def __init__(
        self,
        dao: MessageDaoProtocol,
        storage_service: StorageBase,
    ):
        self.storage_service = storage_service

        if TYPE_CHECKING:
            self.dao = dao

        super().__init__(dao)

    async def get_messages_by_id_chat(
        self, chat_id: UUID, amount: int, page=1, skip: int = 0
    ) -> list[ReadMessageSchema]:
        return await self.dao.get_messages_by_id_chat(
            chat_id, amount, (page - 1) * amount + skip
        )
