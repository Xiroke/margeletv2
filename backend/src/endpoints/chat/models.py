from datetime import datetime, timezone
from typing import TYPE_CHECKING
from uuid import UUID, uuid4

from sqlalchemy import DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.core.db.database import Base

if TYPE_CHECKING:
    from src.endpoints.group.models import GroupModel


class ChatModel(Base):
    __tablename__ = "chat"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    title: Mapped[str] = mapped_column()
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    group_id: Mapped[UUID] = mapped_column(ForeignKey("group.id"), nullable=False)
    group: Mapped["GroupModel"] = relationship(back_populates="chats")
