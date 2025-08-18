from uuid import UUID

from src.core.abstract.permission import Permission
from src.entries.group.service import GroupService


class GroupPermission(Permission):
    def __init__(self, service: GroupService):
        self.service = service

    async def check_user_in_group(self, user_id: UUID, group_id: UUID) -> bool:
        status = await self.service.is_user_in_group(user_id, group_id)
        return status
