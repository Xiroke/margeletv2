from __future__ import annotations
from uuid import UUID
from datetime import datetime

from pydantic import BaseModel, ConfigDict

from src.user.schemas import BaseUserSchema


class BasePersonalChatSchema(BaseModel):
    id: UUID
    title: str
    created_at: datetime


class ReadPersonalChatSchema(BasePersonalChatSchema):
    users: list["BaseUserSchema"]

    model_config = ConfigDict(from_attributes=True)


class CreatePersonalChatSchema(BaseModel):
    title: str


class UpdatePersonalChatSchema(BaseModel):
    title: str | None = None
