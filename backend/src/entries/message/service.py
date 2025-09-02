from uuid import UUID

from src.core.abstract.service_proxy_dao import ProxyServiceToDao
from src.core.abstract.storage_base import StorageBase

from .dao import MessageDaoProtocol
from .schemas import ReadMessageSchema


class MessageService(ProxyServiceToDao):
    def __init__(
        self,
        dao: MessageDaoProtocol,
        storage_service: StorageBase,
    ):
        self.storage_service = storage_service
        self.dao = dao

    async def get_messages_by_group(
        self, group_id: UUID, amount: int, page=1, skip: int = 0
    ) -> list[ReadMessageSchema]:
        return await self.dao.get_messages_by_group(
            group_id, amount, (page - 1) * amount + skip
        )
