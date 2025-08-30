from typing import Annotated

from fastapi import Depends

from src.infrastructure.s3 import S3ServiceDep

from .dao import MessageDaoProtocol, MessageMongoDao
from .service import MessageService


def get_message_dao():
    return MessageMongoDao()


MessageDaoDep = Annotated[MessageDaoProtocol, Depends(get_message_dao)]


def get_message_service(
    dao: MessageDaoDep,
    storage: S3ServiceDep,
) -> MessageService:
    return MessageService(dao, storage)


MessageServiceDep = Annotated[
    MessageService | MessageDaoProtocol, Depends(get_message_service)
]

__all__ = [
    "MessageDaoDep",
    "MessageServiceDep",
]
