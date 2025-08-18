from uuid import UUID

from pydantic import BaseModel, ConfigDict


class ReadIdToUsernameModelSchema(BaseModel):
    id: UUID
    username: str

    model_config = ConfigDict(from_attributes=True)


class CreateIdToUsernameModelSchema(BaseModel):
    id: UUID
    username: str


class UpdateIdToUsernameModelSchema(BaseModel):
    id: UUID
    username: str
