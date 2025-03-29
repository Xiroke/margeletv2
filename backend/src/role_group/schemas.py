from __future__ import annotations
from uuid import UUID
from datetime import datetime

from pydantic import BaseModel, ConfigDict

from .models import RolePermissionsEnum


class BaseRoleGroupSchema(BaseModel):
    id: int
    title: str
    permissions: list[RolePermissionsEnum]
    group_id: UUID
    created_at: datetime


class ReadRoleGroupSchema(BaseRoleGroupSchema):
    model_config = ConfigDict(from_attributes=True)


class CreateRoleGroupSchema(BaseModel):
    title: str
    group_id: UUID


class UpdateRoleGroupSchema(BaseModel):
    title: str | None = None
