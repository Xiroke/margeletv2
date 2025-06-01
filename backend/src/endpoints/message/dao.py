from typing import Protocol

from src.core.abstract.dao_base import DaoProtocol, MongoDaoImpl
from src.endpoints.message.schemas import (
    CreateMessageSchema,
    ReadMessageSchema,
    UpdateMessageSchema,
)

from .models import MessageModel


class MessageDaoProtocol(
    DaoProtocol[
        MessageModel, ReadMessageSchema, CreateMessageSchema, UpdateMessageSchema
    ],
    Protocol,
):
    pass


class MessageMongoDao(
    MongoDaoImpl[
        MessageModel, ReadMessageSchema, CreateMessageSchema, UpdateMessageSchema
    ]
):
    pass
