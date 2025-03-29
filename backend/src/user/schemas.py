from __future__ import annotations
from uuid import UUID
from datetime import datetime

from pydantic import BaseModel, ConfigDict

from src.chat.schemas import BaseChatSchema
from src.role_group.schemas import BaseRoleGroupSchema


class BaseUserSchema(BaseModel):
    id: UUID
    name: str
    account_name: str
    avatar_path: str | None = None
    created_at: datetime


class ReadUserSchema(BaseUserSchema):
    personal_chats: list["BaseChatSchema"] = []
    groups: list["BaseRoleGroupSchema"] = []

    model_config = ConfigDict(from_attributes=True)


class CreateUserSchema(BaseModel):
    name: str
    avatar_path: str | None


class UpdateUserSchema(BaseModel):
    name: str | None
    avatar_path: str | None
