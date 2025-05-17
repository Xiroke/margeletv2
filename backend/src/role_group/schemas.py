from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from .models import RolePermissionsEnum


class BaseRoleGroupSchema(BaseModel):
    id: int
    title: str
    permissions: list[RolePermissionsEnum]
    group_id: UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ReadRoleGroupSchema(BaseRoleGroupSchema):
    pass


class CreateRoleGroupSchema(BaseModel):
    title: str
    group_id: UUID


class UpdateRoleGroupSchema(BaseModel):
    title: str | None = None
