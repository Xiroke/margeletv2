from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.core.db.database import Base
from src.core.db.mixins import CreatedAtMixin, IntIdMixin, UUIDIdMixin

if TYPE_CHECKING:
    from src.endpoints.auth.user.models import UserModel

    from .role.models import RoleModel


class GroupModel(UUIDIdMixin, CreatedAtMixin, Base):
    __tablename__ = "group"
    # GroupModel has no relationship with messages, because they located in nosql

    title: Mapped[str] = mapped_column(String(length=20), unique=True, nullable=False)
    type: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column(nullable=False)
    avatar_path: Mapped[str] = mapped_column(nullable=True)

    users: Mapped[list["UserModel"]] = relationship(
        secondary="user_to_group", back_populates="groups"
    )

    __mapper_args__ = {
        "polymorphic_identity": "group",
        "polymorphic_on": "type",
    }


class UserToGroupModel(IntIdMixin, CreatedAtMixin, Base):
    __tablename__ = "user_to_group"

    user_id: Mapped[UUID] = mapped_column(ForeignKey("user.id"))
    group_id: Mapped[UUID] = mapped_column(ForeignKey("group.id"))

    roles: Mapped[list["RoleModel"]] = relationship(back_populates="user_group")


class SimpleGroupModel(GroupModel):
    __tablename__ = "simple_group"

    id: Mapped[UUID] = mapped_column(ForeignKey("group.id"), primary_key=True)

    __mapper_args__ = {
        "polymorphic_identity": "simple_group",
    }


class SubChatModel(GroupModel):
    __tablename__ = "sub_chat_group"

    id: Mapped[UUID] = mapped_column(ForeignKey("group.id"), primary_key=True)

    multi_group_id: Mapped[UUID] = mapped_column(ForeignKey("multi_group.id"))
    multi_group: Mapped["MultiGroupModel"] = relationship(
        back_populates="chats", foreign_keys=[multi_group_id]
    )

    __mapper_args__ = {
        "polymorphic_identity": "sub_chat_group",
    }


class MultiGroupModel(GroupModel):
    __tablename__ = "multi_group"

    id: Mapped[UUID] = mapped_column(ForeignKey("group.id"), primary_key=True)

    chats: Mapped[list["SubChatModel"]] = relationship(
        back_populates="multi_group", foreign_keys="[SubChatModel.multi_group_id]"
    )

    __mapper_args__ = {
        "polymorphic_identity": "multi_group",
    }
