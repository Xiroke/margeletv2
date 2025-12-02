from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict


class RoleBase(BaseModel):
    id: int
    title: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class RoleRead(RoleBase):
    pass


class RoleCreate(BaseModel):
    title: str


class RoleUpdate(BaseModel):
    title: str | None = None
