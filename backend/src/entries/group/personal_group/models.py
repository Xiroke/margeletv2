from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..group.models import GroupModel
from ..group.schemas import GroupTypeEnum

if TYPE_CHECKING:
    from src.entries.auth.user.models import UserModel


class PersonalGroupModel(GroupModel):
    __tablename__ = GroupTypeEnum.PERSONAL_GROUP

    id: Mapped[UUID] = mapped_column(ForeignKey("group.id"), primary_key=True)

    users: Mapped[list["UserModel"]] = relationship(
        back_populates="groups", secondary="user_to_group", lazy="selectin"
    )

    def get_title(self, current_user_id: UUID) -> str:
        """Return the name of the other user in the group."""
        other = next(user for user in self.users if user.id != current_user_id)
        return other.name

    __mapper_args__ = {
        "polymorphic_identity": GroupTypeEnum.PERSONAL_GROUP,
    }
