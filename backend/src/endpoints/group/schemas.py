from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from src.endpoints.chat.schemas import BaseChatSchema
from src.endpoints.role_group.schemas import BaseRoleGroupSchema


class BaseGroupSchema(BaseModel):
    id: UUID
    title: str = Field(max_length=20)
    description: str | None
    avatar_path: str | None
    panorama_path: str | None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ReadGroupSchema(BaseGroupSchema):
    # users shouldn't be included
    # users: list["ReadUserSchema"] = []
    chats: list["BaseChatSchema"] = []
    roles: list["BaseRoleGroupSchema"] = []


class CreateGroupSchema(BaseModel):
    title: str
    description: str | None


class UpdateGroupSchema(BaseModel):
    title: str | None = None
    description: str | None = None
