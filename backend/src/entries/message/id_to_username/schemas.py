from uuid import UUID

from pydantic import BaseModel, ConfigDict


class ReadIdToUsernameModelSchema(BaseModel):
    user_id: UUID
    username: str

    model_config = ConfigDict(from_attributes=True)


class CreateIdToUsernameModelSchema(BaseModel):
    user_id: UUID
    username: str


class UpdateIdToUsernameModelSchema(BaseModel):
    user_id: UUID
    username: str
