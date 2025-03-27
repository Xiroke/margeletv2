from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid

from src.db.database import Base
from src.db.enum import AllNamesModels


class PersonalChatModel(Base):
    __tablename__ = "personal_chat"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    title: Mapped[str] = mapped_column(unique=True)
    users: Mapped[list[AllNamesModels.USER]] = relationship(
        secondary=AllNamesModels.USER_TO_PERSONAL_CHAT,
        back_populates="personal_chats",
    )
    created_at: Mapped[datetime] = mapped_column(default=datetime.now())
