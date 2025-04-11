from __future__ import annotations
from uuid import UUID
from datetime import datetime

from pydantic import BaseModel, ConfigDict

from src.chat.schemas import BaseChatSchema
from src.role_group.schemas import BaseRoleGroupSchema


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
