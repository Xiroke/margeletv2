from typing import Annotated

from fastapi import Depends

from src.core.abstract.permission_base import PermissionService
from src.endpoints.message.depends import message_dao_factory


class MessagePermission(PermissionService):
    pass


def get_message_permission(dao: message_dao_factory):
    return MessagePermission(dao)


message_permission = Annotated[MessagePermission, Depends(get_message_permission)]

__all__ = ["message_permission"]
