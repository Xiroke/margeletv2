from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from config import settings
from src.core.db.database import get_async_session
from src.endpoints.group.schemas import InvitationTokenSchema
from src.infrastructure.s3 import s3_service_factory
from src.security.jwt import JWTManager

from .dao import GroupDaoProtocol, GroupSqlDao
from .service import GroupService


def get_jwt_manager_invitation() -> JWTManager[InvitationTokenSchema]:
    return JWTManager(
        settings.secrets.INVITE_TOKEN, InvitationTokenSchema, "HS256", 60 * 24
    )


jwt_manager_invitation = Annotated[
    JWTManager[InvitationTokenSchema], Depends(get_jwt_manager_invitation)
]


def get_group_dao(
    session: Annotated[AsyncSession, Depends(get_async_session)],
) -> GroupSqlDao:
    return GroupSqlDao(session)


group_dao_factory = Annotated[GroupDaoProtocol, Depends(get_group_dao)]


def get_group_service(
    dao: group_dao_factory,
    storage: s3_service_factory,
) -> GroupService:
    return GroupService(dao, storage)


group_service_factory = Annotated[GroupService, Depends(get_group_service)]

__all__ = ["group_dao_factory", "group_service_factory", "jwt_manager_invitation"]
