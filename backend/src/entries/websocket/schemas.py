from __future__ import annotations

from enum import StrEnum
from typing import Any
from uuid import UUID

from pydantic import BaseModel, Field

from src.entries.message.schemas import MessageNoUserCreate, MessageRead


class WsEventCategoryEnum(StrEnum):
    MESSAGE = "message"


class WsEventCreate(BaseModel):
    category: WsEventCategoryEnum = Field(default=WsEventCategoryEnum.MESSAGE)
    data: Any


class WsEventRead(BaseModel):
    category: WsEventCategoryEnum = Field(default=WsEventCategoryEnum.MESSAGE)
    data: Any
    to_user: UUID


class WsMessageCreate(WsEventCreate):
    data: MessageNoUserCreate


class WsMessageRead(WsEventRead):
    data: MessageRead
