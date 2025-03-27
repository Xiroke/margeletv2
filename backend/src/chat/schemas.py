from uuid import UUID

from pydantic import BaseModel


class ReadChatSchema(BaseModel):
    id: UUID
    title: str
    created_at: str
    group_id: UUID

    class Config:
        from_attributes = True


class CreateChatSchema(BaseModel):
    title: str


class UpdateChatSchema(BaseModel):
    title: str | None = None
