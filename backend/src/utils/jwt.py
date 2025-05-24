import datetime
from typing import Annotated, Any
from uuid import UUID

import jwt
from fastapi import Depends
from pydantic import BaseModel

from config import settings


class JWTSchema(BaseModel):
    exp: datetime.datetime | None = None


class JWTManager[PayloadSchema: JWTSchema]:
    """
    Class for JWT management
    """

    def __init__(
        self, secret_key: str, algorithm: str = "HS256", expiration_minutes: int = 30
    ):
        self.secret_key = secret_key
        self.algorithm = algorithm
        self.expiration_minutes = expiration_minutes

    def encode(self, payload: PayloadSchema | Any) -> str:
        payload_copy = payload.copy()
        payload_copy.exp = datetime.datetime.now(
            datetime.timezone.utc
        ) + datetime.timedelta(minutes=self.expiration_minutes)
        token = jwt.encode(
            payload_copy.model_dump(), self.secret_key, algorithm=self.algorithm
        )
        return token

    def decode(self, token: str) -> dict:
        decoded = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
        return decoded


class UserJWTSchema(JWTSchema):
    user_id: UUID | int


class UserJWTManager(JWTManager[UserJWTSchema]):
    pass


def get_jwt_manager(jwt_manager: type[JWTManager]) -> JWTManager:
    return jwt_manager(
        settings.JWT_ACCESS_TOKEN_SECRET_KEY,
        settings.JWT_ALGORITHM,
        settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES,
    )


user_jwt_manager_factory = Annotated[
    UserJWTManager, Depends(lambda: get_jwt_manager(UserJWTManager))
]
