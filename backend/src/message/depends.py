from typing import Annotated

from fastapi import Depends

from src.infrastructure.s3 import s3_service_factory

from .dao import MessageMongoDao
from .nosql_models import MessageModel
from .permissions import MessagePermissionDao
from .service import MessageService


def get_message_dao():
    return MessageMongoDao(model=MessageModel)


message_dao_factory = Annotated[MessageMongoDao, Depends(get_message_dao)]


def get_message_permission(dao: message_dao_factory):
    return MessagePermissionDao(dao, MessageModel)


message_permission_factory = Annotated[
    MessagePermissionDao, Depends(get_message_permission)
]


def get_message_service(
    dao: message_dao_factory,
    storage: s3_service_factory,
    permission: message_permission_factory,
) -> MessageService:
    return MessageService(dao, storage, permission)


message_service_factory = Annotated[MessageService, Depends(get_message_service)]
