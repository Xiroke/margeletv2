from typing import Annotated

from fastapi import Depends

from src.infrastructure.s3 import s3_service_factory

from .dao import MessageMongoDao
from .service import MessageService


def get_message_dao():
    return MessageMongoDao()


message_dao_factory = Annotated[MessageMongoDao, Depends(get_message_dao)]


def get_message_service(
    dao: message_dao_factory,
    storage: s3_service_factory,
) -> MessageService:
    return MessageService(dao, storage)


message_service_factory = Annotated[MessageService, Depends(get_message_service)]

__all__ = [
    "message_dao_factory",
    "message_service_factory",
]
