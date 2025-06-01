from typing import Annotated

from fastapi import Depends

from src.core.abstract.permission_base import PermissionService
from src.endpoints.chat.depends import chat_dao_factory


class ChatPermission(PermissionService):
    pass


def get_chat_permission(dao: chat_dao_factory):
    return ChatPermission(dao)


chat_permission = Annotated[ChatPermission, Depends(get_chat_permission)]
