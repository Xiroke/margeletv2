from datetime import datetime
from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.core.db.database import Base
from src.core.db.mixins import UUIDIdMixin

if TYPE_CHECKING:
    from src.endpoints.auth.user.models import UserModel


class RefreshTokenModel(UUIDIdMixin, Base):
    __tablename__ = "refresh_token"

    value: Mapped[str] = mapped_column()
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))

    user_id: Mapped[UUID] = mapped_column(ForeignKey("user.id"), nullable=False)
    user: Mapped["UserModel"] = relationship(back_populates="tokens")
