from typing import Protocol
from uuid import UUID

from beanie import PydanticObjectId

from src.core.abstract.dao import DaoProtocol, MongoDaoImpl

from .models import MessageModel
from .schemas import CreateMessageSchema, ReadMessageSchema, UpdateMessageSchema


class MessageDaoProtocol(
    DaoProtocol[
        MessageModel,
        PydanticObjectId,
        ReadMessageSchema,
        CreateMessageSchema,
        UpdateMessageSchema,
    ],
    Protocol,
):
    async def get_messages_by_group(
        self, group_id: UUID, amount: int, skip: int = 0
    ) -> list[ReadMessageSchema]: ...


class MessageMongoDao(
    MongoDaoImpl[
        MessageModel,
        PydanticObjectId,
        ReadMessageSchema,
        CreateMessageSchema,
        UpdateMessageSchema,
    ]
):
    async def get_messages_by_group(
        self, group_id: UUID, amount: int, skip: int = 0
    ) -> list[ReadMessageSchema]:
        result = await self.model_type.find_many(
            {"to_group_id": group_id},
            sort=[("created_at", -1)],
            limit=amount,
            skip=skip,
        ).to_list()  # type: ignore
        return [ReadMessageSchema.model_validate(i) for i in result]
