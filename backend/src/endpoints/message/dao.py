from typing import Protocol
from uuid import UUID

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
    async def get_messages_by_id_chat(
        self, chat_id: UUID, amount: int, skip: int = 0
    ) -> list[ReadMessageSchema]: ...


class MessageMongoDao(
    MongoDaoImpl[
        MessageModel, ReadMessageSchema, CreateMessageSchema, UpdateMessageSchema
    ]
):
    async def get_messages_by_id_chat(
        self, chat_id: UUID, amount: int, skip: int = 0
    ) -> list[ReadMessageSchema]:
        result = await self.model_type.find_many(
            {"to_chat_id": chat_id}, sort=[("created_at", -1)], limit=amount, skip=skip
        ).to_list()  # type: ignore
        return [ReadMessageSchema.model_validate(i) for i in result]
