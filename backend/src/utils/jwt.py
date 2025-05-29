import datetime
from typing import Annotated, Any

import jwt
from fastapi import Depends
from pydantic import BaseModel

from config import settings


class JWTManager:
    """
    Class for managing JWT tokens
    """

    def __init__(
        self, secret_key: str, algorithm: str = "HS256", expiration_minutes: int = 30
    ):
        self.secret_key = secret_key
        self.algorithm = algorithm
        self.expiration_minutes = expiration_minutes

    def encode(self, payload: BaseModel) -> str:
        data = payload.model_dump()
        data["exp"] = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(
            minutes=self.expiration_minutes
        )
        token = jwt.encode(data, self.secret_key, algorithm=self.algorithm)
        return token

    def decode(self, token: str) -> dict[str, Any]:
        decoded = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
        return decoded


def get_jwt_manager() -> JWTManager:
    return JWTManager(
        settings.JWT_ACCESS_TOKEN_SECRET_KEY,
        settings.JWT_ALGORITHM,
        settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES,
    )


jwt_manager = Annotated[JWTManager, Depends(get_jwt_manager)]

__all__ = ["JWTManager", "jwt_manager"]
