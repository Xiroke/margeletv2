from pydantic import BaseModel

from src.entries.group.personal_group.schemas import ReadPersonalGroupSchema
from src.entries.group.simple_group.schemas import ReadSimpleGroupSchema
from src.entries.message.schemas import ReadMessageSchema


class InvitationTokenSchema(BaseModel):
    group_id: str


ReadAutoGroupSchema = ReadSimpleGroupSchema | ReadPersonalGroupSchema


class ReadAutoGroupsAndMessagesSchema(BaseModel):
    messages: list[ReadMessageSchema]
    groups: list[ReadAutoGroupSchema]


__all__ = ["ReadAutoGroupSchema"]
