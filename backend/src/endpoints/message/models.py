from datetime import datetime, timezone
from uuid import UUID, uuid4

from beanie import Document
from pydantic import Field


class MessageModel(Document):
    id: UUID = Field(default=uuid4)
    id_in_chat: int = Field(default=0)
    message: str
    user_id: UUID
    to_chat_id: UUID
    created_at: datetime = Field(default=lambda: datetime.now(timezone.utc))

    class Settings:
        name = "message"
