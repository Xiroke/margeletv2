from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from ..group.models import GroupModel
from ..group.schemas import GroupTypeEnum


class PersonalGroupModel(GroupModel):
    __tablename__ = GroupTypeEnum.PERSONAL_GROUP

    id: Mapped[UUID] = mapped_column(ForeignKey("group.id"), primary_key=True)

    # this better
    def get_title(self, current_user_id: UUID) -> str:
        """Return the name of the other user in the group."""
        other = next(user for user in self.users if user.id != current_user_id)
        return other.name

    __mapper_args__ = {
        "polymorphic_identity": GroupTypeEnum.PERSONAL_GROUP,
    }
