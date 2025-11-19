from typing import TypeVar

from beanie import Document
from pydantic import BaseModel

from src.core.db.database import Base

ModelType = TypeVar("ModelType", bound=Base | Document, covariant=True)

IDType = TypeVar("IDType", covariant=True)

BaseSchemaType = TypeVar("BaseSchemaType", bound=BaseModel, covariant=True)
ReadSchemaType = TypeVar("ReadSchemaType", bound=BaseModel)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel, contravariant=True)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel, contravariant=True)
