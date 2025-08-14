from datetime import datetime, timezone
from typing import TYPE_CHECKING

from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTableUUID
from sqlalchemy import DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.core.db.database import Base

if TYPE_CHECKING:
    from src.endpoints.group.models import GroupModel
    from src.endpoints.role.models import RoleModel


class UserModel(SQLAlchemyBaseUserTableUUID, Base):
    # also id, email
    name: Mapped[str] = mapped_column()
    account_name: Mapped[str] = mapped_column(unique=True)
    avatar_path: Mapped[str] = mapped_column(nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    roles: Mapped[list["RoleModel"]] = relationship(
        secondary="user_to_role", back_populates="users"
    )
    groups: Mapped[list["GroupModel"]] = relationship(
        secondary="user_to_group", back_populates="users"
    )
