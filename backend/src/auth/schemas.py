import uuid

from fastapi_users import schemas
from src.user.schemas import ReadUserSchema, UpdateUserSchema, CreateUserSchema


class UserRead(schemas.BaseUser[uuid.UUID], ReadUserSchema):
    pass


class UserCreate(schemas.BaseUserCreate, CreateUserSchema):
    pass


class UserUpdate(schemas.BaseUserUpdate, UpdateUserSchema):
    pass
