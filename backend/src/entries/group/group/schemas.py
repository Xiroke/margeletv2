from __future__ import annotations

from datetime import datetime
from typing import Literal
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class GroupTypeEnum(str):
    SIMPLE_GROUP = "simple_group"
    PERSONAL_GROUP = "personal_group"


GroupTypes = Literal["simple_group", "personal_group"]


class BaseGroupSchema(BaseModel):
    id: UUID
    type: GroupTypes
    title: str | None = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ReadGroupSchema(BaseGroupSchema):
    pass


class CreateGroupSchema(BaseModel):
    pass


class UpdateGroupSchema(BaseModel):
    pass
