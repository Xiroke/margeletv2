from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, Table
from sqlalchemy.dialects.postgresql import UUID

from src.db.database import Base

UserToPersonalChatModel = Table(
    "user_to_personal_chat",
    Base.metadata,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("user_id", UUID, ForeignKey("user.id")),
    Column("personal_chat_id", UUID, ForeignKey("personal_chat.id")),
    Column("created_at", DateTime, default=datetime.now()),
)


UserToGroupModel = Table(
    "user_to_group",
    Base.metadata,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("user_id", UUID, ForeignKey("user.id")),
    Column("group_id", UUID, ForeignKey("group.id")),
    Column("created_at", DateTime, default=datetime.now()),
)
