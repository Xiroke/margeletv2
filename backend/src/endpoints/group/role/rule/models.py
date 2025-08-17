from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.core.db.database import Base
from src.core.db.mixins import IntIdMixin

if TYPE_CHECKING:
    from src.endpoints.group.role.models import RoleModel


class RuleModel(IntIdMixin, Base):
    __tablename__ = "rule"

    value: Mapped[str] = mapped_column(nullable=False)

    roles: Mapped[list["RoleModel"]] = relationship(
        back_populates="rules", secondary="role_to_rule"
    )


class RoleToRuleModel(IntIdMixin, Base):
    __tablename__ = "role_to_rule"

    role_id: Mapped[int] = mapped_column(ForeignKey("role.id"), nullable=False)
    rule_id: Mapped[int] = mapped_column(ForeignKey("rule.id"), nullable=False)
