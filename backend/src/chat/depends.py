from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.db.database import get_async_session
from src.infrastructure.s3 import s3_service_factory

from .dao import SqlChatDao
from .models import ChatModel
from .permissions import ChatPermissionDao
from .service import ChatService


def get_chat_dao(session: Annotated[AsyncSession, Depends(get_async_session)]):
    return SqlChatDao(session, model=ChatModel)


chat_dao_factory = Annotated[SqlChatDao, Depends(get_chat_dao)]


def get_chat_permission(dao: chat_dao_factory):
    return ChatPermissionDao(dao, ChatModel)


chat_permission_factory = Annotated[ChatPermissionDao, Depends(get_chat_permission)]


def get_chat_service(
    dao: chat_dao_factory,
    storage: s3_service_factory,
    permission: chat_permission_factory,
) -> ChatService:
    return ChatService(dao, storage, permission)


chat_service_factory = Annotated[ChatService, Depends(get_chat_service)]
