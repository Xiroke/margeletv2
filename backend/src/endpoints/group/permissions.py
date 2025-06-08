from typing import Annotated
from uuid import UUID

from fastapi import Depends

from src.core.abstract.permission_base import PermissionService
from src.endpoints.group.depends import group_service_factory
from src.endpoints.group.service import GroupService
from src.utils.exceptions import PermissionGroupDeniedException


class GroupPermission(PermissionService):
    def __init__(self, service: GroupService):
        self.service = service

    async def check_user_in_group(self, user_id: UUID, group_id: UUID) -> None:
        status = await self.service.is_user_in_group(user_id, group_id)

        if not status:
            raise PermissionGroupDeniedException()


def get_group_permission(group_service: group_service_factory):
    return GroupPermission(group_service)


group_permission = Annotated[GroupPermission, Depends(get_group_permission)]

__all__ = ["group_permission"]
