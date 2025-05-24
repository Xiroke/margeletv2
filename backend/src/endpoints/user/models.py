from __future__ import annotations

import uuid
from datetime import datetime, timezone
from typing import TYPE_CHECKING

from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTableUUID
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.core.db.database import Base
from src.endpoints.role_group.models import RoleGroupModel

if TYPE_CHECKING:
    from src.endpoints.group.models import GroupModel


class UserModel(SQLAlchemyBaseUserTableUUID, Base):
    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column()
    account_name: Mapped[str] = mapped_column(unique=True)
    email: Mapped[str] = mapped_column(unique=True)
    avatar_path: Mapped[str] = mapped_column(nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        default=lambda: datetime.now(timezone.utc)
    )

    role_groups: Mapped[list["RoleGroupModel"]] = relationship(
        secondary="user_to_role_group", back_populates="users"
    )
    groups: Mapped[list["GroupModel"]] = relationship(
        secondary="user_to_group", back_populates="users"
    )
