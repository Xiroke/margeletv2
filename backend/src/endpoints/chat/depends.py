from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.db.database import get_async_session
from src.infrastructure.s3 import s3_service_factory

from .dao import ChatSqlDao
from .service import ChatService


def get_chat_dao(session: Annotated[AsyncSession, Depends(get_async_session)]):
    return ChatSqlDao(session)


chat_dao_factory = Annotated[ChatSqlDao, Depends(get_chat_dao)]


def get_chat_service(
    dao: chat_dao_factory,
    storage: s3_service_factory,
) -> ChatService:
    return ChatService(dao, storage)


chat_service_factory = Annotated[ChatService, Depends(get_chat_service)]

__all__ = ["chat_dao_factory", "chat_service_factory"]
