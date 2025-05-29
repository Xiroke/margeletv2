from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, ForeignKey, Integer, Table
from sqlalchemy.dialects.postgresql import UUID

from src.core.db.database import Base

UserToGroupModel = Table(
    "user_to_group",
    Base.metadata,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("user_id", UUID, ForeignKey("user.id")),
    Column("group_id", UUID, ForeignKey("group.id")),
    Column(
        "created_at",
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
    ),
)
