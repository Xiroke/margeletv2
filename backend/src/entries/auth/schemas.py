from typing import Literal

from pydantic import BaseModel


class AccessTokenRead(BaseModel):
    access_token: str
    token_type: Literal["bearer"]


class AccessTokenJWT(BaseModel):
    user_id: str  # UUID must be converted


class VerificationTokenJWT(BaseModel):
    user_id: str  # UUID must be converted
