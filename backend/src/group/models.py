from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid

from src.db.database import Base
from src.db.enum import AllNamesModels


class GroupModel(Base):
    __tablename__ = "group"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    title: Mapped[str] = mapped_column(unique=True)
    avatar_path: Mapped[str] = mapped_column(nullable=True)
    panorama_path: Mapped[str] = mapped_column(nullable=True)
    created_at: Mapped[datetime] = mapped_column(default=datetime.now())

    users: Mapped[list[AllNamesModels.USER]] = relationship(
        secondary=AllNamesModels.USER_TO_GROUP, back_populates="groups"
    )

    chats: Mapped[list[AllNamesModels.CHAT]] = relationship(back_populates="group")

    roles: Mapped[list[AllNamesModels.ROLE_GROUP]] = relationship(
        back_populates="group"
    )
