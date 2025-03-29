from __future__ import annotations
from uuid import UUID
from datetime import datetime

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
    group_id: UUID


class UpdateChatSchema(BaseModel):
    title: str | None = None
    group_id: UUID | None = None
