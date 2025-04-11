from uuid import uuid4
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID
from src.db.database import Base


class BaseChannel(Base):
    __tablename__ = "base_channel"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid4
    )

    type: Mapped[str]

    __mapper_args__ = {
        "polymorphic_on": "type",  # noqa: F821
        "polymorphic_identity": "base_channel",
    }
