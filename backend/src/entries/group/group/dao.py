from abc import ABC, abstractmethod
from typing import Protocol
from uuid import UUID

from sqlalchemy import and_, delete, insert, select

from src.core.abstract.dao.sql_impl import SqlDaoImpl
from src.entries.group.role.models import RoleToUserGroup

from .models import GroupModel, UserToGroupModel
from .schemas import CreateGroupSchema, ReadGroupSchema, UpdateGroupSchema


class GroupDaoProtocol(Protocol):
    async def is_user_in_group(self, group_id: UUID, user_id: UUID) -> bool: ...
    async def add_user_to_group(self, group_id: UUID, user_id: UUID) -> None: ...
    async def remove_user_from_group(self, group_id: UUID, user_id: UUID) -> None: ...
    async def add_role_to_user(
        self, user_id: UUID, group_id, role_id: UUID
    ) -> None: ...
    async def get_user_ids_in_group(self, group_id: UUID) -> list[UUID]: ...


class GroupSqlDaoBase:
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

    async def get_user_ids_in_group(self, group_id: UUID) -> list[UUID]:
        result = await self.session.execute(  # pyright: ignore[reportAttributeAccessIssue]
            select(UserToGroupModel.user_id).filter(
                UserToGroupModel.group_id == group_id
            )
        )
        return list(result.scalars().all())

    async def add_role_to_user(
        self, user_id: UUID, group_id: UUID, role_id: UUID
    ) -> None:
        user_group_subquery = (
            select(UserToGroupModel.id)
            .filter_by(user_id=user_id, group_id=group_id)
            .scalar_subquery()
        )

        smtp = insert(RoleToUserGroup).values(
            user_group_id=user_group_subquery,
            role_id=role_id,
        )

        await self.session.execute(smtp)  # pyright: ignore[reportAttributeAccessIssue]


class GroupSqlDao(
    SqlDaoImpl[GroupModel, UUID, ReadGroupSchema, CreateGroupSchema, UpdateGroupSchema],
    GroupSqlDaoBase,
):
    """A group class that can be used independently"""

    pass


class GroupDaoProtocolParent(
    GroupDaoProtocol,
    Protocol,
):
    async def get_groups_by_user(self, user_id: UUID) -> list[ReadGroupSchema]: ...
    async def _get_groups_by_user(
        self, group_model: type[GroupModel], user_id: UUID
    ) -> list[GroupModel]: ...


class GroupSqlDaoParent(GroupSqlDaoBase, ABC):
    """A class for heirs only"""

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
