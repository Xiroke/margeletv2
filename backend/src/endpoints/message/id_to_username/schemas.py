from pydantic import BaseModel


class ReadIdToUsernameSchema(BaseModel):
    author: str


class CreateIdToUsernameSchema(BaseModel):
    author: str


class UpdateIdToUsernameSchema(BaseModel):
    author: str
