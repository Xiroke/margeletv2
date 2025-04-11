from __future__ import annotations
from uuid import UUID
from datetime import datetime

from pydantic import BaseModel, ConfigDict
from src.chat.schemas import BaseChatSchema
from src.role_group.schemas import BaseRoleTokenSchema


class BaseTokenSchema(BaseModel):
    id: int
    value: str
    user_id: UUID
    created_at: datetime


class ReadTokenSchema(BaseTokenSchema):
    model_config = ConfigDict(from_attributes=True)
