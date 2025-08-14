import uuid

from fastapi_users import schemas
from pydantic import BaseModel

from src.endpoints.auth.user.schemas import (
    CreateUserSchema,
    ReadUserSchema,
    UpdateUserSchema,
)


class UserRead(schemas.BaseUser[uuid.UUID], ReadUserSchema):
    pass


class UserCreate(schemas.BaseUserCreate, CreateUserSchema):
    pass


class UserUpdate(schemas.BaseUserUpdate, UpdateUserSchema):
    pass


class AccessTokenJWTSchema(BaseModel):
    user_id: str  # UUID must be converted
