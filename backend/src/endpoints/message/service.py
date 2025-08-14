from typing import TYPE_CHECKING
from uuid import UUID

from beanie import PydanticObjectId

from src.core.abstract.service import DaoService
from src.core.abstract.storage_base import StorageBase

from .dao import MessageDaoProtocol
from .models import MessageModel
from .schemas import CreateMessageSchema, ReadMessageSchema, UpdateMessageSchema


class MessageService(
    DaoService[
        PydanticObjectId,
        MessageModel,
        ReadMessageSchema,
        CreateMessageSchema,
        UpdateMessageSchema,
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
