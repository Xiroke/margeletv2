from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class RoleBase(BaseModel):
    id: int
    title: str
    user_group_id: UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class RoleRead(RoleBase):
    pass


class RoleCreate(BaseModel):
    title: str
    user_group_id: UUID


class RoleUpdate(BaseModel):
    title: str | None = None
