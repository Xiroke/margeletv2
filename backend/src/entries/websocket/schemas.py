from __future__ import annotations

from enum import StrEnum
from typing import Any
from uuid import UUID

from pydantic import BaseModel

from src.entries.message.schemas import MessageCreate, MessageRead, MessageUpdate


class WsEventCategoryEnum(StrEnum):
    MESSAGE = "message"
    MESSAGE_UPDATE = "message_update"


class WsEventCreate(BaseModel):
    category: WsEventCategoryEnum
    data: dict | BaseModel


class WsEventRead(BaseModel):
    category: WsEventCategoryEnum
    data: Any
    to_user: UUID


class WsMessageCreate(WsEventCreate):
    data: MessageCreate


class WsMessageRead(WsEventRead):
    data: MessageRead


class WsMessageUpdate(WsEventCreate):
    data: MessageUpdate
