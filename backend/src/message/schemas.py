from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class BaseMessageSchema(BaseModel):
    id: UUID
    id_in_chat: int
    message: str
    user_id: UUID
    to_chat_id: UUID
    created_at: datetime
    author: str | None = None  # optional must be get from IdToUserName


class ReadMessageSchema(BaseMessageSchema):
    model_config = ConfigDict(from_attributes=True)


class CreateMessageSchema(BaseModel):
    message: str
    user_id: UUID | None = None
    to_chat_id: UUID


class UpdateMessageSchema(BaseModel):
    message: str | None


class RecivedDataDTO(CreateMessageSchema):
    pass
