from __future__ import annotations

from datetime import datetime
from enum import StrEnum
from typing import Any
from uuid import UUID

from beanie import PydanticObjectId
from pydantic import BaseModel, ConfigDict, Field


class WebsocketEvent(StrEnum):
    MESSAGE = "message"


class BaseMessageSchema(BaseModel):
    id: PydanticObjectId
    message: str = Field(
        max_length=2000, description="Message must be less than 2000 characters"
    )
    user_id: UUID
    to_group_id: UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ReadMessageSchema(BaseMessageSchema):
    pass


class CreateMessageNoUserSchema(BaseModel):
    message: str = Field(
        max_length=2000, description="Message must be less than 2000 characters"
    )
    to_group_id: UUID


class CreateMessageSchema(CreateMessageNoUserSchema):
    user_id: UUID


class UpdateMessageSchema(BaseModel):
    message: str | None = Field(
        max_length=2000, description="Message must be less than 2000 characters"
    )


class ReadMessagePaginatedSchema(BaseModel):
    messages: list[ReadMessageSchema]
    page: int
    next_page: int  # not delete, this using for generate api in frontend


class ReciveDataDTO(CreateMessageSchema):
    pass


class SendDataSchema(BaseModel):
    event: WebsocketEvent


class SendMessageSchema(SendDataSchema):
    event: WebsocketEvent = Field(default=WebsocketEvent.MESSAGE)
    chat_id: UUID
    data: Any
