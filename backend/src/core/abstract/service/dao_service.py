from typing import Protocol

from src.core.abstract.dao import DaoProtocol
from src.core.types import (
    BaseSchemaType,
    CreateSchemaType,
    IDType,
    ModelType,
    ReadSchemaType,
    UpdateSchemaType,
)

from .service_base import Service


class DaoServiceProtocol(
    DaoProtocol[
        ModelType,
        IDType,
        BaseSchemaType,
        ReadSchemaType,
        CreateSchemaType,
        UpdateSchemaType,
    ],
    Protocol,
):
    pass


class DaoService(Service):
    """redirects the function call if it is not in the service in the dao"""

    def __init__(self, dao: any):  # type: ignore
        self.dao = dao

    def __getattr__(self, name):
        """Call methods from dao if they not exist in service"""
        return getattr(self.dao, name)
