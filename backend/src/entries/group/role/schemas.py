from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class BaseRoleSchema(BaseModel):
    id: int
    title: str
    user_group_id: UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ReadRoleSchema(BaseRoleSchema):
    pass


class CreateRoleSchema(BaseModel):
    title: str
    user_group_id: UUID


class UpdateRoleSchema(BaseModel):
    title: str | None = None
