from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import ForeignKey
from datetime import datetime

from src.db.database import Base
from src.db.enum import AllNamesTables


class UserToPersonalChatModel(Base):
    __tablename__ = "user_to_personal_chat"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[UUID] = mapped_column(ForeignKey(AllNamesTables.USER + ".id"))
    personal_chat_id: Mapped[UUID] = mapped_column(
        ForeignKey(AllNamesTables.PERSONAL_CHAT + ".id")
    )

    created_at: Mapped[datetime] = mapped_column(default=datetime.now())


class UserToGroupModel(Base):
    __tablename__ = "user_to_group"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[UUID] = mapped_column(ForeignKey(AllNamesTables.USER + ".id"))
    group_id: Mapped[UUID] = mapped_column(ForeignKey(AllNamesTables.GROUP + ".id"))

    created_at: Mapped[datetime] = mapped_column(default=datetime.now())
