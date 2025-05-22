from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import ARRAY, ENUM, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.core.db.database import Base

if TYPE_CHECKING:
    from src.group.models import GroupModel


class RolePermissionsEnum(Enum):
    CAN_ALL = "can_all"
    CAN_EDIT_ROLES = "can_edit_roles"
    CAN_SET_AVATAR = "can_set_avatar"
    CAN_SET_PANORAMA = "can_set_panorama"
    CAN_CONTROL_CHATS = "can_control_chats"
    CAN_SEND_MESSAGE = "can_send_message"
    # CAN_INVITE = "can_invite"


class RoleGroupModel(Base):
    __tablename__ = "role_group"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column()
    permissions: Mapped[list[str]] = mapped_column(
        ARRAY(ENUM(RolePermissionsEnum, name="role_permissions")), default=lambda: []
    )
    group_id: Mapped[UUID] = mapped_column(ForeignKey("group.id"))
    group: Mapped["GroupModel"] = relationship(back_populates="roles")
    created_at: Mapped[datetime] = mapped_column(default=datetime.now())
