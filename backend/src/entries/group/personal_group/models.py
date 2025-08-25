from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from ..models import GroupModel
from ..schemas import GroupTypeEnum


class PersonalGroupModel(GroupModel):
    __tablename__ = GroupTypeEnum.PERSONAL_GROUP

    id: Mapped[UUID] = mapped_column(ForeignKey("group.id"), primary_key=True)

    __mapper_args__ = {
        "polymorphic_identity": GroupTypeEnum.PERSONAL_GROUP,
    }
