from pydantic import Field

from ..group.schemas import GroupCreate, GroupRead, GroupUpdate


class SimpleGroupRead(GroupRead):
    pass


class SimpleGroupCreate(GroupCreate):
    title: str = Field(min_length=3, max_length=20)
    description: str


class SimpleGroupUpdate(GroupUpdate):
    title: str | None = None
    description: str | None = None
    avatar_path: str | None = None
