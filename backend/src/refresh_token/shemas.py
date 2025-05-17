from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class BaseTokenSchema(BaseModel):
    id: int
    value: str
    user_id: UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ReadTokenSchema(BaseTokenSchema):
    pass
