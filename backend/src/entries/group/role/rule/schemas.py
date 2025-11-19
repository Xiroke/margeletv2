from __future__ import annotations

from pydantic import BaseModel, ConfigDict


class RuleBase(BaseModel):
    id: str

    model_config = ConfigDict(from_attributes=True)


class RuleRead(RuleBase):
    pass


class RuleCreate(BaseModel):
    id: str
