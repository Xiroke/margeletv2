from beanie import Document
from pydantic import Field
from datetime import datetime
from uuid import UUID, uuid4


class Message(Document):
    id: UUID = Field(default_factory=uuid4)
    id_in_chat: int
    message: str
    user_id: UUID
    to_chat_id: UUID
    is_group: bool
    created_at: datetime = Field(default_factory=datetime.now)

    class Settings:
        name = "message"
