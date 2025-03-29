from __future__ import annotations

from typing import TYPE_CHECKING

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid

from src.db.database import Base

if TYPE_CHECKING:
    from src.user.models import UserModel
    from src.chat.models import ChatModel
    from src.role_group.models import RoleGroupModel


class GroupModel(Base):
    __tablename__ = "group"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    title: Mapped[str] = mapped_column(unique=True)
    avatar_path: Mapped[str] = mapped_column(nullable=True)
    panorama_path: Mapped[str] = mapped_column(nullable=True)
    created_at: Mapped[datetime] = mapped_column(default=datetime.now())

    users: Mapped[list["UserModel"]] = relationship(
        secondary="user_to_group", back_populates="groups"
    )

    chats: Mapped[list["ChatModel"]] = relationship(
        back_populates="group", lazy="selectin"
    )

    roles: Mapped[list["RoleGroupModel"]] = relationship(
        back_populates="group", lazy="selectin"
    )
