from __future__ import annotations
from typing import TYPE_CHECKING

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid

from src.db.database import Base

if TYPE_CHECKING:
    from src.user.models import UserModel


class PersonalChatModel(Base):
    __tablename__ = "personal_chat"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    title: Mapped[str] = mapped_column(unique=True)
    users: Mapped[list["UserModel"]] = relationship(
        secondary="user_to_personal_chat",
        back_populates="personal_chats",
    )
    created_at: Mapped[datetime] = mapped_column(default=datetime.now())
