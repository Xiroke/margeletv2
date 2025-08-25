from abc import ABC
from typing import Any, Generic, Protocol, cast, get_args

from src.core.types import (
    CreateSchemaType,
    IDType,
    ModelType,
    ReadSchemaType,
    UpdateSchemaType,
)


class DaoProtocol(
    Protocol[
        ModelType,
        IDType,
        ReadSchemaType,
        CreateSchemaType,
        UpdateSchemaType,
    ]
):
    """Abstract class for Dao"""

    async def get(self, id: IDType) -> ReadSchemaType: ...

    async def get_many(self, ids: list[IDType]) -> list[ReadSchemaType]:
        """You should pass filter as Model.id == id"""
        ...

    async def create(self, obj: CreateSchemaType) -> ReadSchemaType: ...

    async def update(self, id: IDType, obj: UpdateSchemaType) -> ReadSchemaType:
        """Pass id in values, You should pass filter as Model.id == id"""
        ...

    async def delete(self, id: IDType) -> bool: ...


class Dao(
    Generic[
        ModelType,
        IDType,
        ReadSchemaType,
        CreateSchemaType,
        UpdateSchemaType,
    ],
    ABC,
):
    """Use for dao logic, also used for dao service"""

    model_type: Any
    id_type: type[IDType]
    read_schema_type: type[ReadSchemaType]

    def __init_subclass__(cls) -> None:
        # used in sublass of DAO
        # __init_subclass__ is called when subclass is initialized
        # __orig_bases__ return all class inheritance
        # if we not pass type in generic we will get error
        if not hasattr(cls, "__orig_bases__"):
            raise ValueError("Repository must be implements")
        # get first generic class
        # (SqlDaoImpl[
        # ModelType,
        # IDType,
        # ReadSchemaType,
        # CreateSchemaType,
        # UpdateSchemaType,
        # ])
        base_dao_generic, *_ = cls.__orig_bases__  # type: ignore
        # we garant that types in generic are correct
        cls.model_type, cls.id_type, cls.read_schema_type, *_ = cast(
            tuple[
                type[ModelType],
                type[IDType],
                type[ReadSchemaType],
                type[CreateSchemaType],
                type[UpdateSchemaType],
            ],
            get_args(base_dao_generic),
        )
        return super().__init_subclass__()
