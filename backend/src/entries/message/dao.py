from datetime import datetime
from typing import Protocol
from uuid import UUID

from beanie import PydanticObjectId

from src.core.abstract.dao import DaoProtocol, MongoDaoImpl

from .models import MessageModel
from .schemas import (
    CreateMessageSchema,
    ReadMessageCursorPaginatedSchema,
    ReadMessageSchema,
    UpdateMessageSchema,
)


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
    async def get_cursor_messages_by_group(
        self,
        group_id: UUID,
        amount: int,
        cursor: datetime | None = None,
    ) -> ReadMessageCursorPaginatedSchema: ...


class MessageMongoDao(
    MongoDaoImpl[
        MessageModel,
        PydanticObjectId,
        ReadMessageSchema,
        CreateMessageSchema,
        UpdateMessageSchema,
    ]
):
    async def get_cursor_messages_by_group(
        self, group_id: UUID, amount: int, cursor: datetime | None = None
    ) -> ReadMessageCursorPaginatedSchema:
        if cursor:
            query = MessageModel.find_many(
                MessageModel.created_at < cursor, {"to_group_id": group_id}
            )
        else:
            query = MessageModel.find_many({"to_group_id": group_id})

        query = query.sort(-MessageModel.created_at).limit(amount + 1)
        result = await query.to_list()  # type: ignore
        if not result:
            return ReadMessageCursorPaginatedSchema(
                messages=[], has_more=False, cursor=None
            )
        has_more = len(result) > amount
        messages = [ReadMessageSchema.model_validate(i) for i in result]
        return ReadMessageCursorPaginatedSchema(
            messages=messages, has_more=has_more, cursor=messages[-1].created_at
        )
