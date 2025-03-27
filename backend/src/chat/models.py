from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid

from src.db.database import Base
from src.db.enum import AllNamesModels, AllNamesTables


class ChatModel(Base):
    __tablename__ = "chat"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    title: Mapped[str] = mapped_column(unique=True)
    created_at: Mapped[datetime] = mapped_column(default=datetime.now())

    group_id: Mapped[UUID] = mapped_column(ForeignKey(AllNamesTables.GROUP + ".id"))
    group: Mapped[AllNamesModels.GROUP] = relationship(back_populates="chats")
