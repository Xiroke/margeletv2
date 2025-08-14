from uuid import UUID

from fastapi import UploadFile
from sqlalchemy.exc import IntegrityError

from src.core.abstract.service import DaoService
from src.core.abstract.storage_base import StorageBase
from src.endpoints.group.models import GroupModel
from src.endpoints.group.schemas import (
    CreateGroupSchema,
    ReadGroupSchema,
    UpdateGroupSchema,
)
from src.utils.exceptions import UniqueViolationError
from src.utils.utils import get_field_unique_error

from .dao import GroupDaoProtocol


class GroupService(
    DaoService[UUID, GroupModel, ReadGroupSchema, CreateGroupSchema, UpdateGroupSchema]
):
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

    async def is_user_in_group(self, user_id: UUID, group_id: UUID) -> bool:
        return await self.dao.is_user_in_group(group_id, user_id)

    async def add_user_to_group(self, group_id: UUID, user_id: UUID) -> None:
        return await self.dao.add_user_to_group(group_id, user_id)

    async def leave_group(self, group_id: UUID, user_id: UUID) -> None:
        await self.dao.remove_user_from_group(group_id, user_id)

    async def get_groups_by_user(self, user_id: UUID) -> list[ReadGroupSchema]:
        return await self.dao.get_groups_by_user(user_id)

    async def add_role_to_user(self, user_id: UUID, role_id: UUID) -> None:
        await self.dao.add_role_to_user(user_id, role_id)
