from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr


class UserBase(BaseModel):
    id: UUID
    name: str
    account_name: str
    email: EmailStr
    avatar_path: str | None = None
    is_active: bool
    is_verified: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class UserRead(UserBase):
    pass


class UserCreate(BaseModel):
    name: str
    account_name: str
    email: EmailStr
    password: str


class UserUpdate(BaseModel):
    name: str | None = None
    avatar_path: str | None = None


class UserInternalUpdate(BaseModel):
    is_active: bool | None = None
    is_verified: bool | None = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str
