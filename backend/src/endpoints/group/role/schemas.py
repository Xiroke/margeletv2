from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from src.endpoints.role.models import RolePermissionsEnum


class BaseRoleSchema(BaseModel):
    id: UUID
    title: str
    group_id: UUID
    created_at: datetime
    permissions: list[RolePermissionsEnum]

    model_config = ConfigDict(from_attributes=True)


class ReadRoleSchema(BaseRoleSchema):
    pass


class CreateRoleSchema(BaseModel):
    title: str
    group_id: UUID
    permissions: list[RolePermissionsEnum] = []


class UpdateRoleSchema(BaseModel):
    title: str | None = None
    permissions: list[RolePermissionsEnum] | None = None
