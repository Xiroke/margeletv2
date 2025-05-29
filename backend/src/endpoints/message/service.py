from typing import TYPE_CHECKING

from src.core.abstract.service_base import DaoBaseService
from src.core.abstract.storage_base import StorageBase
from src.endpoints.message.permissions import MessagePermission

from .dao import MessageDaoBase
from .models import MessageModel


class MessageService(DaoBaseService[MessageModel]):
    def __init__(
        self,
        dao: MessageDaoBase,
        storage_service: StorageBase,
    ):
        self.storage_service = storage_service
        self.permission = MessagePermission(dao)

        if TYPE_CHECKING:
            self.dao = dao

        super().__init__(dao)
