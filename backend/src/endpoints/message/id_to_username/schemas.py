from pydantic import BaseModel


class ReadIdToUsernameSchema(BaseModel):
    username: str


class CreateIdToUsernameSchema(BaseModel):
    username: str


class UpdateIdToUsernameSchema(BaseModel):
    username: str
