from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime

from src.db.database import Base
from src.db.enum import AllNamesModels


class UserModel(SQLAlchemyBaseUserTableUUID, Base):
    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )

    created_at: Mapped[datetime] = mapped_column(default=datetime.now())

    personal_chats: Mapped[list[AllNamesModels.PERSONAL_CHAT]] = relationship(
        secondary=AllNamesModels.USER_TO_PERSONAL_CHAT, back_populates="users"
    )

    groups: Mapped[list[AllNamesModels.GROUP]] = relationship(
        secondary=AllNamesModels.USER_TO_GROUP, back_populates="users"
    )
