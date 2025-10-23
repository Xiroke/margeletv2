from datetime import datetime
from uuid import UUID

from src.core.abstract.service_proxy_dao import ProxyServiceToDao
from src.core.abstract.storage_base import StorageBase

from .dao import MessageDaoProtocol
from .schemas import ReadMessageCursorPaginatedSchema


class MessageService(ProxyServiceToDao):
    def __init__(
        self,
        dao: MessageDaoProtocol,
        storage_service: StorageBase,
    ):
        self.storage_service = storage_service
        self.dao = dao

    async def get_cursor_messages_by_group(
        self,
        group_id: UUID,
        limit: int = 15,
        cursor: datetime | None = None,
    ) -> ReadMessageCursorPaginatedSchema:
        return await self.dao.get_cursor_messages_by_group(group_id, limit, cursor)
