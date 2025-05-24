from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.db.database import get_async_session
from src.endpoints.role_group.dao import RoleGroupSqlDao

from .models import RoleGroupModel
from .permissions import RoleGroupPermission
from .service import RoleGroupService


def get_role_group_dao(session: Annotated[AsyncSession, Depends(get_async_session)]):
    return RoleGroupSqlDao(session, model=RoleGroupModel)


role_group_dao_factory = Annotated[RoleGroupSqlDao, Depends(get_role_group_dao)]


def get_role_group_permission(dao: role_group_dao_factory):
    return RoleGroupPermission(dao, RoleGroupModel)


role_group_permission_factory = Annotated[
    RoleGroupPermission, Depends(get_role_group_permission)
]


def get_role_group_service(
    dao: role_group_dao_factory,
    permission: role_group_permission_factory,
) -> RoleGroupService:
    return RoleGroupService(dao, permission)


role_group_service_factory = Annotated[
    RoleGroupService, Depends(get_role_group_service)
]
