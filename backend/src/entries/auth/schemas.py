from typing import Literal

from pydantic import BaseModel


class ReadAccessTokenSchema(BaseModel):
    access_token: str
    token_type: Literal["bearer"]


class AccessTokenJWTSchema(BaseModel):
    user_id: str  # UUID must be converted


class VerificationTokenJWTSchema(BaseModel):
    user_id: str  # UUID must be converted
