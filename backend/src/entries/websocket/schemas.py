from enum import StrEnum
from uuid import UUID

from beanie import PydanticObjectId
from pydantic import BaseModel

from src.entries.message.schemas import MessageCreate, MessageRead, MessageUpdate


class WsEventCategoryEnum(StrEnum):
    MESSAGE_UPDATE = "message_update"
    MESSAGE_CREATE = "message_create"


class WsBaseEvent(BaseModel):
    category: WsEventCategoryEnum


# Универсальный входящий event
class WsEventCreate(WsBaseEvent):
    data: dict | MessageCreate | MessageUpdate | None = None
    id: PydanticObjectId | None = None


class WsMessageCreate(WsBaseEvent):
    category: WsEventCategoryEnum = WsEventCategoryEnum.MESSAGE_CREATE
    data: MessageCreate


class WsMessageUpdate(WsBaseEvent):
    category: WsEventCategoryEnum = WsEventCategoryEnum.MESSAGE_UPDATE
    id: PydanticObjectId
    data: MessageUpdate


# 3. To client
class WsMessageRead(WsBaseEvent):
    category: WsEventCategoryEnum
    data: MessageRead
    to_user: UUID
