from typing import TYPE_CHECKING

from fastapi import UploadFile

from src.core.abstract.service_base import DaoBaseService
from src.core.abstract.storage_base import StorageBase
from src.endpoints.user.permissions import UserPermission

from .dao import UserDaoBase
from .models import UserModel


class UserService(DaoBaseService[UserModel]):
    def __init__(
        self,
        dao: UserDaoBase,
        storage_service: StorageBase,
    ):
        self.storage_service = storage_service
        self.permission = UserPermission(dao)

        if TYPE_CHECKING:
            self.dao = dao

        super().__init__(dao)

    async def load_avatar(self, key: str) -> bytes:
        return await self.storage_service.get(key)

    async def upload_avatar(self, key: str, value: UploadFile) -> None:
        value_bytes = await value.read()
        return await self.storage_service.save(key, value_bytes)
