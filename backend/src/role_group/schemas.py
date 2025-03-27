from uuid import UUID

from pydantic import BaseModel

from .models import RolePermissionsEnum


class ReadRoleGroupSchema(BaseModel):
    id: int
    title: str
    permissions: list[RolePermissionsEnum]
    group_id: UUID
    created_at: str

    class Config:
        from_attributes = True


class CreateRoleGroupSchema(BaseModel):
    title: str


class UpdateRoleGroupSchema(BaseModel):
    title: str | None = None
