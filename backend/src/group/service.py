from typing import TYPE_CHECKING, Any

from fastapi import UploadFile

from src.core.abstract.permission_base import PermissionDaoBase
from src.core.abstract.service_base import DaoBaseService
from src.core.abstract.storage_base import StorageBase

from .dao import GroupDaoBase
from .models import GroupModel


class GroupService(DaoBaseService[GroupModel]):
    def __init__(
        self,
        dao: GroupDaoBase,
        storage_service: StorageBase,
        permission: PermissionDaoBase,
    ):
        self.storage_service = storage_service
        self.permission = permission

        if TYPE_CHECKING:
            self.dao = dao

        super().__init__(dao, permission)

    async def load_avatar(self, key: str) -> bytes:
        return await self.storage_service.get(key)

    async def load_panorama(self, key: str) -> bytes:
        return await self.storage_service.get(key)

    async def upload_avatar(self, key: str, value: UploadFile) -> bytes:
        return await self.storage_service.save(key, value)

    async def upload_panorama(self, key: str, value: UploadFile) -> bytes:
        return await self.storage_service.save(key, value)

    async def get_user_groups(self, user_id: Any) -> list[GroupModel]:
        return await self.dao.get_user_groups(user_id)
