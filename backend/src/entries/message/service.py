from src.core.abstract.service_proxy_dao import ProxyServiceToDao
from src.core.abstract.storage_base import StorageBase

from .dao import MessageDaoProtocol


class MessageService(ProxyServiceToDao):
    def __init__(
        self,
        dao: MessageDaoProtocol,
        storage_service: StorageBase,
    ):
        self.storage_service = storage_service
        self.dao = dao
