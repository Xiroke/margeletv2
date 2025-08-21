from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.core.db.database import Base
from src.core.db.mixins import CreatedAtMixin, IntIdMixin

if TYPE_CHECKING:
    from src.entries.group.models import UserToGroupModel
    from src.entries.group.role.rule.models import RuleModel


class RoleModel(IntIdMixin, CreatedAtMixin, Base):
    __tablename__ = "role"

    title: Mapped[str] = mapped_column(nullable=False)

    rules: Mapped[list["RuleModel"]] = relationship(
        back_populates="roles", secondary="role_to_rule"
    )

    user_groups: Mapped[list["UserToGroupModel"]] = relationship(
        back_populates="roles", secondary="role_to_usergroup"
    )


class RoleToUserGroup(IntIdMixin, CreatedAtMixin, Base):
    __tablename__ = "role_to_usergroup"

    user_group_id: Mapped[int] = mapped_column(
        ForeignKey("user_to_group.id"), nullable=False
    )
    role_id: Mapped[int] = mapped_column(ForeignKey("role.id"), nullable=False)


__all__ = [
    "RoleModel",
]
