from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from src.core.db.database import Base
from src.core.db.mixins import IntIdMixin

if TYPE_CHECKING:
    pass


class RuleModel(Base):
    __tablename__ = "rule"
    # id is the name of the rule
    id: Mapped[str] = mapped_column(primary_key=True)


class RoleToRuleModel(IntIdMixin, Base):
    __tablename__ = "role_to_rule"

    role_id: Mapped[int] = mapped_column(ForeignKey("role.id"), nullable=False)
    rule_id: Mapped[int] = mapped_column(ForeignKey("rule.id"), nullable=False)
