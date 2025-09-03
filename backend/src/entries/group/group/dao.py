from abc import ABC, abstractmethod
from typing import Protocol
from uuid import UUID

from sqlalchemy import and_, delete, insert, select

from .models import GroupModel, UserToGroupModel
from .schemas import ReadGroupSchema


class GroupDaoProtocolBase(
    Protocol,
):
    async def get_groups_by_user(self, user_id: UUID) -> list[ReadGroupSchema]: ...
    async def _get_groups_by_user(
        self, group_model: type[GroupModel], user_id: UUID
    ) -> list[GroupModel]: ...

    async def is_user_in_group(self, group_id: UUID, user_id: UUID) -> bool: ...
    async def add_user_to_group(self, group_id: UUID, user_id: UUID) -> None: ...
    async def remove_user_from_group(self, group_id: UUID, user_id: UUID) -> None: ...
    async def add_role_to_user(self, user_id: UUID, role_id: UUID) -> None: ...
    async def get_users_id_in_group(self, group_id: UUID) -> list[UUID]: ...


class GroupSqlDaoBase(ABC):
    @abstractmethod
    async def get_groups_by_user(self, user_id: UUID) -> list[ReadGroupSchema]:
        pass

    async def _get_groups_by_user(
        self, group_model: type[GroupModel], user_id: UUID
    ) -> list[GroupModel]:
        """
        Returns user groups for the specified group model
        Used in get_groups_by_user where validation takes place
        """
        result = await self.session.execute(  # type: ignore
            select(group_model).join(
                UserToGroupModel,
                and_(
                    UserToGroupModel.user_id == user_id,
                    UserToGroupModel.group_id == group_model.id,
                ),
            )
        )
        return list(result.scalars().all())

    async def is_user_in_group(self, group_id: UUID, user_id: UUID) -> bool:
        result = await self.session.execute(  # pyright: ignore[reportAttributeAccessIssue]
            select(UserToGroupModel).filter(
                and_(
                    UserToGroupModel.user_id == user_id,
                    UserToGroupModel.group_id == group_id,
                )
            )
        )
        return result.scalar_one_or_none() is not None

    async def add_user_to_group(self, group_id: UUID, user_id: UUID) -> None:
        await self.session.execute(  # pyright: ignore[reportAttributeAccessIssue]
            insert(UserToGroupModel).values(group_id=group_id, user_id=user_id)
        )
        await self.session.flush()  # pyright: ignore[reportAttributeAccessIssue]

    async def remove_user_from_group(self, group_id: UUID, user_id: UUID) -> None:
        await self.session.execute(  # pyright: ignore[reportAttributeAccessIssue]
            delete(UserToGroupModel).filter(
                and_(
                    UserToGroupModel.user_id == user_id,
                    UserToGroupModel.group_id == group_id,
                )
            )
        )
        await self.session.flush()  # pyright: ignore[reportAttributeAccessIssue]

    async def get_users_id_in_group(self, group_id: UUID) -> list[UUID]:
        result = await self.session.execute(  # pyright: ignore[reportAttributeAccessIssue]
            select(UserToGroupModel.user_id).filter(
                UserToGroupModel.group_id == group_id
            )
        )
        return list(result.scalars().all())
