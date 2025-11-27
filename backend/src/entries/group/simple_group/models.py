from uuid import UUID

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from ..group.models import GroupModel
from ..group.schemas import GroupTypeEnum


class SimpleGroupModel(GroupModel):
    __tablename__ = GroupTypeEnum.SIMPLE_GROUP

    id: Mapped[UUID] = mapped_column(ForeignKey("group.id"), primary_key=True)
    title: Mapped[str] = mapped_column(String(length=20), unique=True, nullable=False)
    description: Mapped[str] = mapped_column(nullable=True)
    avatar_path: Mapped[str] = mapped_column(nullable=True)
    is_public: Mapped[bool] = mapped_column(default=True, nullable=False)

    __mapper_args__ = {
        "polymorphic_identity": GroupTypeEnum.SIMPLE_GROUP,
    }
