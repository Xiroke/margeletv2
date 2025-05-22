from __future__ import annotations

from datetime import datetime
from typing import TYPE_CHECKING
from uuid import uuid4

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.core.db.database import Base

if TYPE_CHECKING:
    from src.chat.models import ChatModel
    from src.role_group.models import RoleGroupModel
    from src.user.models import UserModel


class GroupModel(Base):
    __tablename__ = "group"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid4
    )
    title: Mapped[str] = mapped_column(unique=True)
    description: Mapped[str] = mapped_column(nullable=True)
    avatar_path: Mapped[str] = mapped_column(nullable=True)
    panorama_path: Mapped[str] = mapped_column(nullable=True)
    is_group_one_chat: Mapped[bool] = mapped_column(default=True)
    is_personal_group: Mapped[bool] = mapped_column(default=False)
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
