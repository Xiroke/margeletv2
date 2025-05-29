from abc import ABC, abstractmethod
from uuid import UUID

from sqlalchemy import and_, insert, select
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.abstract.dao_base import DaoBase, SqlDaoBaseDefault
from src.core.db.models.secondary_models.models import UserToGroupModel

from .models import GroupModel


class GroupDaoBase[M](DaoBase[M], ABC):
    @abstractmethod
    async def create(self, obj: M, user_id: UUID | int) -> M:
        pass

    @abstractmethod
    async def get_user_groups(self, user_id: UUID | int) -> list[M]:
        pass

    @abstractmethod
    async def is_user_in_group(self, id: UUID | int, user_id: UUID | int) -> bool:
        pass

    @abstractmethod
    async def add_user_to_group(self, id: UUID | int, user_id: UUID | int):
        pass


class GroupSqlDao(SqlDaoBaseDefault[GroupModel], GroupDaoBase[GroupModel]):
    def __init__(self, session: AsyncSession, model: type[GroupModel]):
        super().__init__(session, model)

    # ovverride
    async def create(self, obj: type[GroupModel], user_id: UUID | int):
        self.session.add(obj)
        await self.session.flush()
        await self.session.execute(
            insert(UserToGroupModel).values(group_id=obj.id, user_id=user_id)
        )
        await self.session.commit()
        await self.session.refresh(obj)
        return obj

    async def get_user_groups(self, user_id: UUID | int) -> list[GroupModel]:
        groups = await self.session.execute(
            select(GroupModel)
            .join(
                UserToGroupModel,
                and_(
                    UserToGroupModel.c.group_id == GroupModel.id,
                    UserToGroupModel.c.user_id == user_id,
                ),
            )
            .filter(UserToGroupModel.c.user_id == user_id)
        )
        return list(groups.scalars().all())

    async def is_user_in_group(self, id: UUID | int, user_id: UUID | int):
        result = await self.session.execute(
            select(UserToGroupModel)
            .filter(UserToGroupModel.c.user_id == user_id)
            .filter(UserToGroupModel.c.group_id == id)
        )
        if result.scalars().one() is None:
            return False

        return True

    async def add_user_to_group(self, id: UUID | int, user_id: UUID | int):
        await self.session.execute(
            insert(UserToGroupModel).values(group_id=id, user_id=user_id)
        )
        await self.session.commit()
