from abc import ABC, abstractmethod
from typing import TYPE_CHECKING, Any
from uuid import UUID

from fastapi import UploadFile

from src.core.abstract.service_base import DaoBaseService
from src.core.abstract.storage_base import StorageBase
from src.endpoints.group.models import GroupModel
from src.endpoints.group.permissions import GroupPermission

from .dao import GroupDaoBase


class GroupServiceBase[M](ABC):
    @abstractmethod
    async def load_avatar(self, key: str) -> bytes:
        pass

    @abstractmethod
    async def load_panorama(self, key: str) -> bytes:
        pass

    @abstractmethod
    async def upload_avatar(self, key: str, value: UploadFile) -> None:
        pass

    @abstractmethod
    async def upload_panorama(self, key: str, value: UploadFile) -> None:
        pass

    @abstractmethod
    async def get_user_groups(self, user_id: Any) -> list[M]:
        pass


class GroupService(DaoBaseService[GroupModel], GroupServiceBase[GroupModel]):
    def __init__(
        self,
        dao: GroupDaoBase[GroupModel],
        storage_service: StorageBase,
    ):
        self.storage_service = storage_service
        self.permission = GroupPermission(dao)

        if TYPE_CHECKING:
            self.dao = dao

        super().__init__(dao)

    async def create(self, obj: GroupModel, user_id: UUID) -> GroupModel:
        return await self.dao.create(obj, user_id)

    async def load_avatar(self, key: str) -> bytes:
        return await self.storage_service.get(key)

    async def load_panorama(self, key: str) -> bytes:
        return await self.storage_service.get(key)

    async def upload_avatar(self, key: str, value: UploadFile) -> None:
        value_bytes = await value.read()
        return await self.storage_service.save(key, value_bytes)

    async def upload_panorama(self, key: str, value: UploadFile) -> None:
        value_bytes = await value.read()
        await self.storage_service.save(key, value_bytes)

    async def get_user_groups(self, user_id: Any) -> list[GroupModel]:
        return await self.dao.get_user_groups(user_id)
