from __future__ import annotations
from uuid import UUID
from datetime import datetime

from pydantic import BaseModel, ConfigDict
from fastapi import UploadFile, File

from src.chat.schemas import BaseChatSchema
from src.role_group.schemas import BaseRoleGroupSchema


class BaseGroupSchema(BaseModel):
    id: UUID
    title: str
    # image shouldn't be included, they will be sent separately
    # avatar_path
    # panorama_path
    created_at: datetime


class ReadGroupSchema(BaseGroupSchema):
    # users shouldn't be included
    # users: list["ReadUserSchema"] = []
    chats: list["BaseChatSchema"] = []
    roles: list["BaseRoleGroupSchema"] = []

    model_config = ConfigDict(from_attributes=True)


class CreateGroupSchema(BaseModel):
    title: str
    avatar: UploadFile | None = File(None)
    panorama: UploadFile | None = File(None)


class UpdateGroupSchema(BaseModel):
    title: str | None
    avatar: UploadFile | None = File(None)
    panorama: UploadFile | None = File(None)
