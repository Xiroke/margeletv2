from uuid import UUID
from typing import TYPE_CHECKING

from pydantic import BaseModel


if TYPE_CHECKING:
    from src.user.schemas import ReadUserSchema
    from src.chat.schemas import ReadChatSchema
    from src.role_group.schemas import ReadRoleGroupSchema


class ReadGroupSchema(BaseModel):
    id: UUID
    title: str
    avatar_path: str | None = None
    panorama_path: str | None = None
    created_at: str
    users: list["ReadUserSchema"] = []
    chats: list["ReadChatSchema"] = []
    roles: list["ReadRoleGroupSchema"] = []

    class Config:
        from_attributes = True


class CreateGroupSchema(BaseModel):
    title: str
    avatar_path: str | None
    panorama_path: str | None


class UpdateGroupSchema(BaseModel):
    title: str | None
    avatar_path: str | None
    panorama_path: str | None
