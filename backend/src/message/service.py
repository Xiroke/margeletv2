from typing import TYPE_CHECKING

from src.core.abstract.permission_base import PermissionDaoBase
from src.core.abstract.service_base import DaoBaseService
from src.core.abstract.storage_base import StorageBase

from .dao import MessageDaoBase
from .nosql_models import MessageModel


class MessageService(DaoBaseService[MessageModel]):
    def __init__(
        self,
        dao: MessageDaoBase,
        storage_service: StorageBase,
        permission: PermissionDaoBase,
    ):
        self.storage_service = storage_service
        self.permission = permission

        if TYPE_CHECKING:
            self.dao = dao

        super().__init__(dao, self.permission)
