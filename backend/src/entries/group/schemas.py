from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class BaseGroupSchema(BaseModel):
    id: UUID
    title: str = Field(max_length=20)
    type: str
    description: str
    avatar_path: str | None = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ReadGroupSchema(BaseGroupSchema):
    pass


class CreateGroupSchema(BaseModel):
    title: str
    description: str


class UpdateGroupSchema(BaseModel):
    title: str | None = None
    description: str | None = None
    avatar_path: str | None = None


class InvitationTokenSchema(BaseModel):
    group_id: str
