from datetime import datetime
from typing import Protocol
from uuid import UUID

from beanie import PydanticObjectId

from src.core.abstract.dao import DaoProtocol, MongoDaoImpl

from .models import MessageModel
from .schemas import (
    MessageCreate,
    MessageCursorPaginatedRead,
    MessageRead,
    MessageUpdate,
)


class MessageDaoProtocol(
    DaoProtocol[
        MessageModel,
        PydanticObjectId,
        MessageRead,
        MessageCreate,
        MessageUpdate,
    ],
    Protocol,
):
    async def get_cursor_messages_by_group(
        self,
        group_id: UUID,
        amount: int,
        cursor: datetime | None = None,
    ) -> MessageCursorPaginatedRead: ...

    async def get_last_messages_by_group(
        self, group_id: UUID, amount: int
    ) -> list[MessageRead]: ...

    async def get_last_message_in_groups(
        self, group_ids: list[UUID]
    ) -> list[MessageRead]: ...


class MessageMongoDao(
    MongoDaoImpl[
        MessageModel,
        PydanticObjectId,
        MessageRead,
        MessageCreate,
        MessageUpdate,
    ]
):
    async def get_cursor_messages_by_group(
        self, group_id: UUID, amount: int, cursor: datetime | None = None
    ) -> MessageCursorPaginatedRead:
        if cursor:
            query = MessageModel.find_many(
                MessageModel.created_at < cursor, {"to_group_id": group_id}
            )
        else:
            query = MessageModel.find_many({"to_group_id": group_id})

        query = query.sort(-MessageModel.created_at).limit(amount + 1)
        result = await query.to_list()  # type: ignore
        if not result:
            return MessageCursorPaginatedRead(messages=[], has_more=False, cursor=None)
        has_more = len(result) > amount
        messages = [MessageRead.model_validate(i) for i in result]
        return MessageCursorPaginatedRead(
            messages=messages, has_more=has_more, cursor=messages[-1].created_at
        )

    async def get_last_messages_by_group(
        self, group_id: UUID, amount: int
    ) -> list[MessageRead]:
        query = (
            MessageModel.find_many({"to_group_id": group_id})
            .sort(-MessageModel.created_at)
            .limit(amount)
        )
        return [MessageRead.model_validate(i) for i in await query.to_list()]

    async def get_last_message_in_groups(
        self, group_ids: list[UUID]
    ) -> list[MessageRead]:
        query = (
            MessageModel.find_many({"to_group_id": {"$in": group_ids}})
            .sort(-MessageModel.created_at)
            .limit(1)
        )
        return [MessageRead.model_validate(i) for i in await query.to_list()]
