from uuid import UUID
from typing import TYPE_CHECKING

from pydantic import BaseModel

if TYPE_CHECKING:
    from src.chat.schemas import ReadChatSchema
    from src.role_group.schemas import ReadRoleGroupSchema


class ReadUserSchema(BaseModel):
    id: UUID
    name: str
    account_name: str
    avatar_path: str | None = None
    created_at: str
    personal_chats: list["ReadChatSchema"] = []
    groups: list["ReadRoleGroupSchema"] = []


class CreateUserSchema(BaseModel):
    name: str
    avatar_path: str | None


class UpdateUserSchema(BaseModel):
    name: str | None
    avatar_path: str | None
