from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class BaseUserSchema(BaseModel):
    id: UUID
    name: str
    account_name: str
    created_at: datetime


class ReadUserSchema(BaseUserSchema):
    model_config = ConfigDict(from_attributes=True)


class CreateUserSchema(BaseModel):
    name: str
    account_name: str
    email: str


class UpdateUserSchema(BaseModel):
    name: str | None
