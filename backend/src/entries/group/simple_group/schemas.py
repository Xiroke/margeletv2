from pydantic import Field

from ..group.schemas import CreateGroupSchema, ReadGroupSchema, UpdateGroupSchema


class ReadSimpleGroupSchema(ReadGroupSchema):
    pass


class CreateSimpleGroupSchema(CreateGroupSchema):
    title: str = Field(min_length=3, max_length=20)
    description: str


class UpdateSimpleGroupSchema(UpdateGroupSchema):
    title: str | None = None
    description: str | None = None
    avatar_path: str | None = None
