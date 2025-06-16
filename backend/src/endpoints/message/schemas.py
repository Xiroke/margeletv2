from __future__ import annotations

from datetime import datetime
from enum import StrEnum
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class WebsocketEvent(StrEnum):
    MESSAGE = "message"


class BaseMessageSchema(BaseModel):
    id: UUID
    id_in_chat: int
    message: str = Field(
        max_length=2000, description="Message must be less than 2000 characters"
    )
    user_id: UUID
    to_chat_id: UUID
    created_at: datetime
    author: str | None = None  # optional must be get from IdToUsernameModel

    model_config = ConfigDict(from_attributes=True)


class ReadMessageSchema(BaseMessageSchema):
    pass


class ReadMessagePaginatedSchema(BaseModel):
    messages: list[ReadMessageSchema]
    page: int
    next_page: int  # not delete, this using for generate api in frontend


class CreateMessageSchema(BaseModel):
    message: str = Field(
        max_length=2000, description="Message must be less than 2000 characters"
    )
    user_id: UUID | None = None
    to_chat_id: UUID


class UpdateMessageSchema(BaseModel):
    message: str | None = Field(
        max_length=2000, description="Message must be less than 2000 characters"
    )


class ReciveDataDTO(CreateMessageSchema):
    pass


class SendDataSchema(BaseModel):
    event: WebsocketEvent


class SendMessageSchema(SendDataSchema):
    event: WebsocketEvent = Field(default=WebsocketEvent.MESSAGE)
    chat_id: UUID
    data: Any
