from typing import TYPE_CHECKING

from sqlalchemy import Boolean, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.core.db.database import Base
from src.core.db.mixins import CreatedAtMixin, UUIDIdMixin
from src.endpoints.auth.refresh_token.models import RefreshTokenModel

if TYPE_CHECKING:
    from src.endpoints.group.models import GroupModel
    from src.endpoints.role.models import RoleModel


class UserModel(UUIDIdMixin, CreatedAtMixin, Base):
    __tablename__ = "user"
    # also id, email
    name: Mapped[str] = mapped_column(nullable=False)
    account_name: Mapped[str] = mapped_column(unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(length=320), unique=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(length=1024), nullable=False)

    avatar_path: Mapped[str] = mapped_column(nullable=True)

    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    tokens: Mapped["RefreshTokenModel"] = relationship(back_populates="user")

    roles: Mapped[list["RoleModel"]] = relationship(
        secondary="user_to_role", back_populates="users"
    )
    groups: Mapped[list["GroupModel"]] = relationship(
        secondary="user_to_group", back_populates="users"
    )
