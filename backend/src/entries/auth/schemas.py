from pydantic import BaseModel


class AccessTokenJWTSchema(BaseModel):
    user_id: str  # UUID must be converted


class VerificationTokenJWTSchema(BaseModel):
    user_id: str  # UUID must be converted
