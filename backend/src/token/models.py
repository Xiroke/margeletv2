from __future__ import annotations

from typing import TYPE_CHECKING

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime

from src.db.database import Base

if TYPE_CHECKING:
    from src.user.models import UserModel


class TokenModel(Base):
    __tablename__ = "token"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    value: Mapped[str] = mapped_column()
    user_id: Mapped[UUID] = mapped_column(ForeignKey("user.id"))
    user: Mapped["UserModel"] = relationship(back_populates="tokens")
    created_at: Mapped[datetime] = mapped_column(default=datetime.now())
