from uuid import UUID

from src.core.abstract.service import DaoService
from src.core.abstract.storage_base import StorageBase

from .dao import MessageDaoProtocol
from .schemas import ReadMessageSchema


class MessageService(DaoService):
    def __init__(
        self,
        dao: MessageDaoProtocol,
        storage_service: StorageBase,
    ):
        self.storage_service = storage_service
        self.dao = dao

    async def get_messages_by_id_chat(
        self, chat_id: UUID, amount: int, page=1, skip: int = 0
    ) -> list[ReadMessageSchema]:
        return await self.dao.get_messages_by_id_chat(
            chat_id, amount, (page - 1) * amount + skip
        )
