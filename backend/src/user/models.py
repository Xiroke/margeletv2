from __future__ import annotations

import uuid
from datetime import datetime
from typing import TYPE_CHECKING

from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTableUUID
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.db.database import Base

if TYPE_CHECKING:
    from src.group.models import GroupModel


class UserModel(SQLAlchemyBaseUserTableUUID, Base):
    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column()
    account_name: Mapped[str] = mapped_column(unique=True)
    email: Mapped[str] = mapped_column(unique=True)
    avatar_path: Mapped[str] = mapped_column(nullable=True)

    created_at: Mapped[datetime] = mapped_column(default=datetime.now())

    groups: Mapped[list["GroupModel"]] = relationship(
        secondary="user_to_group", back_populates="users"
    )
