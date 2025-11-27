from datetime import datetime, timezone
from uuid import UUID

from beanie import Document
from pydantic import Field


class MessageModel(Document):
    id_in_chat: int = Field(default=0)
    message: str
    user_id: UUID
    to_group_id: UUID
    is_edited: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Settings:
        name = "message"
