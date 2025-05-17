from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.database import get_async_session
from src.group.models import GroupModel

from .dao import GroupDAO
from .service import GroupServiceSQLA


def get_group_dao(session: Annotated[AsyncSession, Depends(get_async_session)]):
    return GroupDAO(session, model=GroupModel)


group_dao_factory = Annotated[GroupDAO, Depends(get_group_dao)]


def get_group_service(group_factory: group_dao_factory) -> GroupServiceSQLA:
    return GroupServiceSQLA(group_factory)


group_service_factory = Annotated[GroupDAO, Depends(get_group_service)]
