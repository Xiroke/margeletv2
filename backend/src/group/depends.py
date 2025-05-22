from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.db.database import get_async_session
from src.infrastructure.s3 import s3_service_factory

from .dao import SqlGroupDao
from .models import GroupModel
from .permissions import GroupPermissionDao
from .service import GroupService


def get_group_dao(session: Annotated[AsyncSession, Depends(get_async_session)]):
    return SqlGroupDao(session, model=GroupModel)


group_dao_factory = Annotated[SqlGroupDao, Depends(get_group_dao)]


def get_group_permission(dao: group_dao_factory):
    return GroupPermissionDao(dao, GroupModel)


group_permission_factory = Annotated[GroupPermissionDao, Depends(get_group_permission)]


def get_group_service(
    dao: group_dao_factory,
    storage: s3_service_factory,
    permission: group_permission_factory,
) -> GroupService:
    return GroupService(dao, storage, permission)


group_service_factory = Annotated[GroupService, Depends(get_group_service)]
