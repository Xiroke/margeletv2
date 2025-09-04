from __future__ import annotations

from enum import StrEnum
from typing import Any
from uuid import UUID

from pydantic import BaseModel, Field

from src.entries.message.schemas import CreateMessageNoUserSchema, ReadMessageSchema


class WsDataEvent(StrEnum):
    MESSAGE = "message"


class WsInDataSchema(BaseModel):
    event: WsDataEvent = Field(default=WsDataEvent.MESSAGE)
    data: Any


class WsOutDataSchema(BaseModel):
    event: WsDataEvent = Field(default=WsDataEvent.MESSAGE)
    data: Any
    to_user: UUID


class WsInMessageSchema(WsInDataSchema):
    data: CreateMessageNoUserSchema


class WsOutMessageSchema(WsOutDataSchema):
    data: ReadMessageSchema
