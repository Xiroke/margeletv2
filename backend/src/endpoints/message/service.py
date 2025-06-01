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

        super().__init__(dao)
