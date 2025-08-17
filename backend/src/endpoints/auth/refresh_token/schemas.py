from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class BaseRefreshTokenSchema(BaseModel):
    id: UUID
    value: str
    user_id: UUID
    expired_at: datetime
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ReadRefreshTokenSchema(BaseRefreshTokenSchema):
    pass


class CreateRefreshTokenSchema(BaseModel):
    value: str
    user_id: str
    expired_at: datetime
