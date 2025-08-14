from datetime import datetime, timezone
from enum import Enum
from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import ARRAY, ENUM
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.core.db.database import Base

if TYPE_CHECKING:
    from src.endpoints.auth.user.models import UserModel
    from src.endpoints.group.models import GroupModel


class RolePermissionsEnum(Enum):
    CAN_ALL = "can_all"
    CAN_EDIT_GROUP_SETTINGS = "can_edit_group_settings"
    CAN_EDIT_ROLES = "can_edit_roles"
    CAN_CONTROL_CHATS = "can_control_chats"
    CAN_SEND_MESSAGE = "can_send_message"
    CAN_INVITE = "can_invite"


class RoleModel(Base):
    __tablename__ = "role"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column()
    permissions: Mapped[list[str]] = mapped_column(
        ARRAY(ENUM(RolePermissionsEnum, name="role_permissions")),
        default=lambda: [],
    )
    users: Mapped[list["UserModel"]] = relationship(
        secondary="user_to_role", back_populates="roles"
    )
    group_id: Mapped[UUID] = mapped_column(ForeignKey("group.id"))
    group: Mapped["GroupModel"] = relationship(back_populates="roles")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )


creator_permissions = [
    RolePermissionsEnum.CAN_ALL,
    RolePermissionsEnum.CAN_EDIT_GROUP_SETTINGS,
    RolePermissionsEnum.CAN_EDIT_ROLES,
    RolePermissionsEnum.CAN_CONTROL_CHATS,
    RolePermissionsEnum.CAN_SEND_MESSAGE,
    RolePermissionsEnum.CAN_INVITE,
]

newbie_permissions = [
    RolePermissionsEnum.CAN_SEND_MESSAGE,
    RolePermissionsEnum.CAN_INVITE,
]

__all__ = [
    "RoleModel",
    "RolePermissionsEnum",
    "creator_permissions",
    "newbie_permissions",
]
