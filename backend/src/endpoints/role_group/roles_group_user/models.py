from __future__ import annotations

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from src.core.db.database import Base


class RoleGroupToUserModel(Base):
    __tablename__ = "role_group"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    role_group_id: Mapped[int] = mapped_column(ForeignKey("role_group.id"))
