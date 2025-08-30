from fastapi import UploadFile

from src.core.abstract.service_proxy_dao import ProxyServiceToDao
from src.core.abstract.storage_base import StorageBase

from .dao import UserDaoProtocol


class UserService(ProxyServiceToDao):
    def __init__(
        self,
        dao: UserDaoProtocol,
        storage_service: StorageBase,
    ):
        self.storage_service = storage_service
        super().__init__(dao)

    async def load_avatar(self, key: str):
        return await self.storage_service.get(key)

    async def upload_avatar(self, key: str, value: UploadFile):
        value_bytes = await value.read()
        return await self.storage_service.save(key, value_bytes)
