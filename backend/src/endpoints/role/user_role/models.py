from __future__ import annotations

from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from src.core.db.database import Base


class UserToRoleModel(Base):
    __tablename__ = "user_to_role"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[UUID] = mapped_column(ForeignKey("user.id"))
    role_id: Mapped[UUID] = mapped_column(ForeignKey("role.id"))
