from __future__ import annotations

from pydantic import BaseModel, ConfigDict


class BaseRuleSchema(BaseModel):
    id: str

    model_config = ConfigDict(from_attributes=True)


class ReadRuleSchema(BaseRuleSchema):
    pass


class CreateRuleSchema(BaseModel):
    id: str
