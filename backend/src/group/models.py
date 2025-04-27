from __future__ import annotations

from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.db.models.base_models.models import BaseChannel

if TYPE_CHECKING:
    from src.chat.models import ChatModel
    from src.role_group.models import RoleGroupModel
    from src.user.models import UserModel


class GroupModel(BaseChannel):
    __tablename__ = "group"

    id: Mapped[UUID] = mapped_column(ForeignKey("base_channel.id"), primary_key=True)
    title: Mapped[str] = mapped_column(unique=True)
    description: Mapped[str] = mapped_column(nullable=True)
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

    __mapper_args__ = {
        "polymorphic_identity": "group",
    }
