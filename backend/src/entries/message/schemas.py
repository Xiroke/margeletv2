from __future__ import annotations

from datetime import datetime
from uuid import UUID

from beanie import PydanticObjectId
from pydantic import BaseModel, ConfigDict, Field


class BaseMessageSchema(BaseModel):
    id: PydanticObjectId
    message: str
    user_id: UUID
    to_group_id: UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ReadMessageSchema(BaseMessageSchema):
    pass


class CreateMessageNoUserSchema(BaseModel):
    message: str = Field(
        min_length=1,
        max_length=2000,
        description="Message must be less than 2000 characters and more than 1 character",
    )
    to_group_id: UUID


class CreateMessageSchema(CreateMessageNoUserSchema):
    user_id: UUID


class UpdateMessageSchema(BaseModel):
    message: str | None = Field(
        min_length=1,
        max_length=2000,
        description="Message must be less than 2000 characters and more than 1 character",
    )


class ReadMessageCursorPaginatedSchema(BaseModel):
    messages: list[ReadMessageSchema]
    has_more: bool
    cursor: datetime | None


class ReciveDataDTO(CreateMessageSchema):
    pass
