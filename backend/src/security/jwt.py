from datetime import datetime, timedelta, timezone
from typing import Generic, TypeVar

import jwt
from pydantic import BaseModel

DataSchema = TypeVar("DataSchema", bound=BaseModel)


class JWTManager(Generic[DataSchema]):
    """
    Class for managing JWT tokens
    """

    def __init__(
        self,
        secret_key: str,
        data_schema: type[DataSchema],
        algorithm: str = "HS256",
        expiration_minutes: int = 30,
    ):
        self.data_schema = data_schema
        self.secret_key = secret_key
        self.algorithm = algorithm
        self.expiration_minutes = expiration_minutes

    def encode(self, payload: DataSchema) -> str:
        data = payload.model_dump()
        data["exp"] = datetime.now(timezone.utc) + timedelta(
            minutes=self.expiration_minutes
        )
        token = jwt.encode(data, self.secret_key, algorithm=self.algorithm)
        return token

    def decode(self, token: str) -> DataSchema:
        decoded = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
        return self.data_schema.model_validate(decoded)


__all__ = ["JWTManager"]
