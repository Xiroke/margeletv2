from __future__ import annotations
from uuid import UUID
from datetime import datetime

from pydantic import BaseModel, ConfigDict


class BaseMessageSchema(BaseModel):
    id: UUID
    id_in_chat: int
    message: str
    user_id: UUID
    to_chat_id: UUID
    is_group: bool
    created_at: datetime


class ReadMessageSchema(BaseMessageSchema):
    model_config = ConfigDict(from_attributes=True)


class CreateMessageSchema(BaseModel):
    message: str
    user_id: UUID
    to_chat_id: UUID
    is_group: bool


class UpdateMessageSchema(BaseModel):
    message: str | None


class RecivedDataDTO(CreateMessageSchema):
    pass
