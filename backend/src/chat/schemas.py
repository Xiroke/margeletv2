from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class BaseChatSchema(BaseModel):
    id: UUID
    title: str
    created_at: datetime
    group_id: UUID


class ReadChatSchema(BaseChatSchema):
    model_config = ConfigDict(from_attributes=True)


class CreateChatSchema(BaseModel):
    title: str


class UpdateChatSchema(BaseModel):
    title: str | None = None
