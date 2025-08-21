from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from config import settings
from src.core.db.database import get_async_session
from src.entries.group.schemas import InvitationTokenSchema
from src.infrastructure.s3 import S3ServiceDep
from src.security.jwt import JWTManager

from .dao import GroupDaoProtocol, GroupSqlDao, PersonalGroupDao, SimpleGroupDao
from .service import GroupService


def get_jwt_manager_invitation() -> JWTManager[InvitationTokenSchema]:
    return JWTManager(
        settings.secrets.INVITE_TOKEN, InvitationTokenSchema, "HS256", 60 * 24
    )


JwtManagerInvitationDep = Annotated[
    JWTManager[InvitationTokenSchema], Depends(get_jwt_manager_invitation)
]


def get_group_dao(
    session: Annotated[AsyncSession, Depends(get_async_session)], group_type: str
) -> SimpleGroupDao | PersonalGroupDao | GroupSqlDao:
    if group_type == "simple_group":
        return SimpleGroupDao(session)
    elif group_type == "personal_group":
        return PersonalGroupDao(session)
    else:
        return GroupSqlDao(session)


GroupDaoDep = Annotated[GroupDaoProtocol, Depends(get_group_dao)]


def get_group_service(
    dao: GroupDaoDep,
    storage: S3ServiceDep,
) -> GroupService:
    return GroupService(dao, storage)


GroupServiceDep = Annotated[GroupService, Depends(get_group_service)]

__all__ = ["GroupDaoDep", "GroupServiceDep", "JwtManagerInvitationDep"]
