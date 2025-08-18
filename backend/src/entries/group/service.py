from uuid import UUID

from fastapi import UploadFile
from sqlalchemy.exc import IntegrityError

from src.core.abstract.service import DaoService
from src.core.abstract.storage_base import StorageBase
from src.entries.group.schemas import CreateGroupSchema, ReadGroupSchema
from src.utils.exceptions import UniqueViolationError
from src.utils.utils import get_field_unique_error

from .dao import GroupDaoProtocol


class GroupService(DaoService, GroupDaoProtocol):
    def __init__(
        self,
        dao: GroupDaoProtocol,
        storage_service: StorageBase,
    ):
        self.storage_service = storage_service
        self.dao = dao

    async def create(self, obj: CreateGroupSchema, user_id: UUID) -> ReadGroupSchema:
        try:
            return await self.dao.create(obj, user_id)
        except IntegrityError as e:
            field = get_field_unique_error(e)
            if field == "title":
                raise UniqueViolationError(
                    message="Group with this title already exists"
                )
            raise

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
