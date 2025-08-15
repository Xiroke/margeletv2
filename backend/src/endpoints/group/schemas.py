from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from src.endpoints.role.schemas import BaseRoleSchema


class BaseGroupSchema(BaseModel):
    id: UUID
    title: str = Field(max_length=20)
    description: str
    avatar_path: str | None = None
    panorama_path: str | None = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ReadGroupSchema(BaseGroupSchema):
    roles: list["BaseRoleSchema"] = []


class CreateGroupSchema(BaseModel):
    title: str
    description: str


class UpdateGroupSchema(BaseModel):
    title: str | None = None
    description: str | None = None
    avatar_path: str | None = None
    panorama_path: str | None = None


class InvitationTokenSchema(BaseModel):
    user_id: str
    group_id: str
