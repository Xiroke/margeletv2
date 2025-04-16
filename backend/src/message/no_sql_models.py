from beanie import Document
from pydantic import Field
from datetime import datetime, timezone
from uuid import UUID, uuid4


class MessageModel(Document):
    id: UUID = Field(default_factory=uuid4)
    id_in_chat: int = Field(default=0)
    message: str
    user_id: UUID
    to_chat_id: UUID
    is_group: bool
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Settings:
        name = "message"
