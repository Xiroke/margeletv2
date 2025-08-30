from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.core.db.database import Base
from src.core.db.mixins import CreatedAtMixin, IntIdMixin, UUIDIdMixin

if TYPE_CHECKING:
    from src.entries.auth.user.models import UserModel

    from ..role.models import RoleModel


class GroupModel(UUIDIdMixin, CreatedAtMixin, Base):
    __tablename__ = "group"
    # GroupModel has no relationship with messages, because they located in nosql

    type: Mapped[str] = mapped_column(nullable=False)

    users: Mapped[list["UserModel"]] = relationship(
        secondary="user_to_group", back_populates="groups"
    )

    __mapper_args__ = {
        "polymorphic_identity": "group",
        "polymorphic_on": "type",
    }


class UserToGroupModel(IntIdMixin, CreatedAtMixin, Base):
    __tablename__ = "user_to_group"

    user_id: Mapped[UUID] = mapped_column(ForeignKey("user.id"), nullable=False)
    group_id: Mapped[UUID] = mapped_column(ForeignKey("group.id"), nullable=False)

    # in a personal group, this will allow you to block the user.
    roles: Mapped[list["RoleModel"]] = relationship(
        back_populates="user_groups", secondary="role_to_usergroup"
    )

    __table_args__ = (UniqueConstraint("group_id", "user_id", name="uq_group_user"),)
