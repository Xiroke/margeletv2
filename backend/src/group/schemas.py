from __future__ import annotations
from uuid import UUID
from datetime import datetime

from pydantic import BaseModel, ConfigDict
from src.chat.schemas import BaseChatSchema
from src.role_group.schemas import BaseRoleGroupSchema


class BaseGroupSchema(BaseModel):
    id: UUID
    title: str
    description: str | None
    avatar_path: str | None
    panorama_path: str | None
    created_at: datetime


class ReadGroupSchema(BaseGroupSchema):
    # users shouldn't be included
    # users: list["ReadUserSchema"] = []
    chats: list["BaseChatSchema"] = []
    roles: list["BaseRoleGroupSchema"] = []

    model_config = ConfigDict(from_attributes=True)


class CreateGroupSchema(BaseModel):
    title: str
    description: str | None


class UpdateGroupSchema(BaseModel):
    title: str | None = None
    description: str | None = None
