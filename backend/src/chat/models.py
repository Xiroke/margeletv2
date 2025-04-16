from __future__ import annotations

from typing import TYPE_CHECKING
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid

from src.db.database import Base


if TYPE_CHECKING:
    from src.group.models import GroupModel


class ChatModel(Base):
    __tablename__ = "chat"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    title: Mapped[str] = mapped_column()
    created_at: Mapped[datetime] = mapped_column(default=datetime.now())

    group_id: Mapped[UUID] = mapped_column(ForeignKey("group.id"), nullable=False)
    group: Mapped["GroupModel"] = relationship(back_populates="chats")
