from typing import TYPE_CHECKING, Any

from src.core.abstract.service_base import DaoBaseService
from src.core.abstract.storage_base import StorageBase
from src.endpoints.chat.permissions import ChatPermission

from .dao import ChatDaoBase
from .models import ChatModel


class ChatService(DaoBaseService[ChatModel]):
    def __init__(
        self,
        dao: ChatDaoBase,
        storage_service: StorageBase,
    ):
        self.storage_service = storage_service
        self.permission = ChatPermission

        if TYPE_CHECKING:
            self.dao = dao

        super().__init__(dao)

    async def get_all_chats_by_user(self, id: Any):
        return await self.dao.get_all_chats_by_user(id)
