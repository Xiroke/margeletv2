from __future__ import annotations

from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from src.core.db.database import Base
from src.core.db.mixins import IntIdMixin


class UserToRoleModel(IntIdMixin, Base):
    __tablename__ = "user_to_role"

    user_id: Mapped[UUID] = mapped_column(ForeignKey("user.id"), nullable=False)
    role_id: Mapped[UUID] = mapped_column(ForeignKey("role.id"), nullable=False)
