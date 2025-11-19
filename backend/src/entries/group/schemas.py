from pydantic import BaseModel

from src.entries.group.personal_group.schemas import PersonalGroupRead
from src.entries.group.simple_group.schemas import SimpleGroupRead
from src.entries.message.schemas import MessageRead


class InvitationTokenSchema(BaseModel):
    group_id: str


AutoGroupRead = SimpleGroupRead | PersonalGroupRead


class AutoGroupsAndMessagesRead(BaseModel):
    messages: list[MessageRead]
    groups: list[AutoGroupRead]


__all__ = ["AutoGroupRead"]
