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

    model_config = ConfigDict(from_attributes=True)


class ReadRoleSchema(BaseRoleSchema):
    permissions: list[RolePermissionsEnum]


class CreateRoleSchema(BaseModel):
    title: str


class UpdateRoleSchema(BaseModel):
    title: str | None = None
