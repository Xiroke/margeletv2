from __future__ import annotations
from typing import TYPE_CHECKING

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime

from src.db.models.base_models.models import BaseChannel

if TYPE_CHECKING:
    from src.user.models import UserModel


class PersonalChatModel(BaseChannel):
    __tablename__ = "personal_chat"

    id: Mapped[UUID] = mapped_column(ForeignKey("base_channel.id"), primary_key=True)
    title: Mapped[str] = mapped_column(unique=True)
    users: Mapped[list["UserModel"]] = relationship(
        secondary="user_to_personal_chat",
        back_populates="personal_chats",
    )
    created_at: Mapped[datetime] = mapped_column(default=datetime.now())

    __mapper_args__ = {
        "polymorphic_identity": "personal_chat",
    }
