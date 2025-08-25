from __future__ import annotations

from datetime import datetime
from typing import Literal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class GroupTypeEnum(str):
    SIMPLE_GROUP = "simple_group"
    PERSONAL_GROUP = "personal_group"


GroupTypes = Literal["simple_group", "personal_group"]


class BaseGroupSchema(BaseModel):
    id: UUID
    title: str = Field(max_length=20)
    type: GroupTypes
    description: str
    avatar_path: str | None = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ReadGroupSchema(BaseGroupSchema):
    pass


class CreateGroupSchema(BaseModel):
    title: str
    type: GroupTypes


class UpdateGroupSchema(BaseModel):
    title: str | None = None


class InvitationTokenSchema(BaseModel):
    group_id: str
