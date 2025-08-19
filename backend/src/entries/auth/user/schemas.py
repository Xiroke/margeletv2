from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class BaseUserSchema(BaseModel):
    id: UUID
    name: str
    account_name: str
    email: str
    avatar_path: str
    is_active: bool
    is_verified: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ReadUserSchema(BaseUserSchema):
    pass


class CreateUserSchema(BaseModel):
    name: str
    account_name: str
    email: str
    password: str


class UpdateUserSchema(BaseModel):
    name: str | None = None
    avatar_path: str | None = None


class LoginUserSchema(BaseModel):
    email: str
    password: str
