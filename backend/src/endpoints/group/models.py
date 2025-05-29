from __future__ import annotations

from datetime import datetime, timezone
from typing import TYPE_CHECKING
from uuid import uuid4

from sqlalchemy import DateTime, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.core.db.database import Base

if TYPE_CHECKING:
    from src.endpoints.chat.models import ChatModel
    from src.endpoints.role.models import RoleModel
    from src.endpoints.user.models import UserModel


class GroupModel(Base):
    __tablename__ = "group"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid4
    )
    title: Mapped[str] = mapped_column(String(length=20), unique=True, nullable=False)
    description: Mapped[str] = mapped_column(nullable=False)
    avatar_path: Mapped[str] = mapped_column(nullable=True)
    panorama_path: Mapped[str] = mapped_column(nullable=True)
    is_group_one_chat: Mapped[bool] = mapped_column(default=True)
    is_personal_group: Mapped[bool] = mapped_column(default=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    users: Mapped[list["UserModel"]] = relationship(
        secondary="user_to_group", back_populates="groups"
    )

    chats: Mapped[list["ChatModel"]] = relationship(
        back_populates="group", lazy="selectin"
    )

    roles: Mapped[list["RoleModel"]] = relationship(
        back_populates="group", lazy="selectin"
    )
