from __future__ import annotations

from typing import TYPE_CHECKING

from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime

from src.db.database import Base

if TYPE_CHECKING:
    from src.personal_chat.models import PersonalChatModel
    from src.group.models import GroupModel
    from src.token.models import TokenModel


class UserModel(SQLAlchemyBaseUserTableUUID, Base):
    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column()
    account_name: Mapped[str] = mapped_column(unique=True)
    email: Mapped[str] = mapped_column(unique=True)
    avatar_path: Mapped[str] = mapped_column(nullable=True)

    created_at: Mapped[datetime] = mapped_column(default=datetime.now())

    personal_chats: Mapped[list["PersonalChatModel"]] = relationship(
        secondary="user_to_personal_chat", back_populates="users"
    )

    groups: Mapped[list["GroupModel"]] = relationship(
        secondary="user_to_group", back_populates="users"
    )
