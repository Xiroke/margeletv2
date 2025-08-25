from abc import ABC

from fastapi import UploadFile

from src.core.abstract.service import DaoService
from src.core.abstract.storage_base import StorageBase


class GroupService(ABC):
    def __init__(
        self,
        storage_service: StorageBase,
    ):
        self.storage_service = storage_service

    async def load_avatar(self, key: str) -> bytes:
        return await self.storage_service.get(key)

    async def upload_avatar(self, key: str, value: UploadFile) -> None:
        value_bytes = await value.read()
        return await self.storage_service.save(key, value_bytes)


class SimpleGroupService(GroupService, DaoService):
    def __init__(
        self,
        storage_service: StorageBase,
    ):
        self.storage_service = storage_service

    async def load_avatar(self, key: str) -> bytes:
        return await self.storage_service.get(key)

    async def upload_avatar(self, key: str, value: UploadFile) -> None:
        value_bytes = await value.read()
        return await self.storage_service.save(key, value_bytes)
