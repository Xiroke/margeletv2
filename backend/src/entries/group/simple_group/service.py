from uuid import UUID

from fastapi import UploadFile

from src.core.abstract.service_proxy_dao import ProxyServiceToDao
from src.core.abstract.storage_base import StorageBase
from src.entries.group.role.rule.dao import RuleDaoProtocol
from src.entries.group.simple_group.schemas import SimpleGroupCreate

from .dao import SimpleGroupDaoProtocol


class SimpleGroupService(ProxyServiceToDao):
    def __init__(
        self,
        dao: SimpleGroupDaoProtocol,
        rule_dao: RuleDaoProtocol,
        storage_service: StorageBase,
    ):
        self.dao = dao
        self.storage_service = storage_service
        self.rule_dao = rule_dao

    async def create(self, obj: SimpleGroupCreate, user_id: UUID):
        group = await self.dao.create(obj, returning=True)
        role_creator_id = await self.dao.generate_basic_roles()
        await self.dao.set_creator_group(group.id, user_id, role_creator_id)

    async def load_avatar(self, key: str) -> bytes:
        return await self.storage_service.get(key)

    async def upload_avatar(self, key: str, value: UploadFile) -> None:
        value_bytes = await value.read()
        return await self.storage_service.save(key, value_bytes)
