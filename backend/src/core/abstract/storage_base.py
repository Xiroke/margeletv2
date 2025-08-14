from abc import ABC, abstractmethod
from typing import Any

from fastapi import UploadFile


class StorageBase(ABC):
    @abstractmethod
    async def get(self, key: str) -> bytes:
        """return not null file"""
        pass

    @abstractmethod
    async def save(self, key: str, value: Any) -> None:
        """save file to storage"""
        pass

    @abstractmethod
    async def delete(self, key: str) -> Any:
        """delete file from storage"""
        pass

    @abstractmethod
    async def save_image(self, key: str, value: UploadFile) -> list[str]:
        """save object as image to storage"""
        pass
