from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class BasePersonalChatSchema(BaseModel):
    id: UUID
    title: str
    created_at: datetime


class ReadPersonalChatSchema(BasePersonalChatSchema):
    # not used
    # users: list["BaseUserSchema"]

    model_config = ConfigDict(from_attributes=True)


class CreatePersonalChatSchema(BaseModel):
    title: str


class UpdatePersonalChatSchema(BaseModel):
    title: str | None = None
