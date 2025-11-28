from __future__ import annotations

from datetime import datetime
from uuid import UUID

from beanie import PydanticObjectId
from pydantic import BaseModel, ConfigDict, Field


class MessageBase(BaseModel):
    id: PydanticObjectId
    message: str
    user_id: UUID
    to_group_id: UUID
    created_at: datetime
    is_edited: bool

    model_config = ConfigDict(from_attributes=True)


class MessageRead(MessageBase):
    pass


class MessageCreate(BaseModel):
    message: str = Field(
        min_length=1,
        max_length=2000,
        description="Message must be less than 2000 characters and more than 1 character",
    )
    to_group_id: UUID


class MessageInternalCreate(MessageCreate):
    user_id: UUID
    is_edited: bool = False


class MessageUpdate(BaseModel):
    message: str | None = Field(
        min_length=1,
        max_length=2000,
        description="Message must be less than 2000 characters and more than 1 character",
    )


class MessageInternalUpdate(MessageUpdate):
    is_edited: bool = True


class MessageCursorPaginatedRead(BaseModel):
    messages: list[MessageRead]
    has_more: bool
    cursor: datetime | None


class ReciveDataDTO(MessageInternalCreate):
    pass
