from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class BaseMessageSchema(BaseModel):
    id: UUID
    id_in_chat: int
    message: str = Field(
        max_length=2000, description="Message must be less than 2000 characters"
    )
    user_id: UUID
    to_chat_id: UUID
    created_at: datetime
    author: str | None = None  # optional must be get from IdToUserName

    model_config = ConfigDict(from_attributes=True)


class ReadMessageSchema(BaseMessageSchema):
    pass


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


class RecivedDataDTO(CreateMessageSchema):
    pass
