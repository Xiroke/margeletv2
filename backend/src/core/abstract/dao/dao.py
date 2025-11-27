from abc import ABC
from typing import Any, Generic, Literal, Protocol, cast, get_args, overload

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
    async def get(self, **filters: Any) -> ReadSchemaType: ...
    async def get_many(self, **filters: Any) -> list[ReadSchemaType]: ...

    @overload
    async def create(
        self, obj: CreateSchemaType, returning: Literal[True]
    ) -> ReadSchemaType: ...
    @overload
    async def create(
        self, obj: CreateSchemaType, returning: Literal[False] = ...
    ) -> None: ...
    async def create(
        self, obj: CreateSchemaType, returning: bool = False
    ) -> ReadSchemaType | None: ...

    @overload
    async def update(
        self,
        obj: UpdateSchemaType,
        returning: Literal[True],
        is_many: bool = False,
        **filters: Any,
    ) -> ReadSchemaType: ...
    @overload
    async def update(
        self,
        obj: UpdateSchemaType,
        returning: Literal[False] = ...,
        is_many: bool = False,
        **filters: Any,
    ) -> None: ...
    async def update(
        self,
        obj: UpdateSchemaType,
        returning: bool = False,
        is_many: bool = False,
        **filters: Any,
    ) -> ReadSchemaType | None: ...

    async def delete(self, is_many: bool = False, **filters: Any) -> None: ...


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
    """Base generic DAO class for extracting type parameters. Does not define method implementations."""

    model_type: Any
    id_type: type[IDType]
    read_schema_type: type[ReadSchemaType]

    def __init_subclass__(cls) -> None:
        if not hasattr(cls, "__orig_bases__"):
            raise TypeError("DAO subclass must be generic and inherit from Dao[...]")

        # Get the first base that is parameterized with generics (i.e., Dao[...])
        for base in cls.__orig_bases__:
            args = get_args(base)
            if len(args) == 5:  # Dao has 5 type parameters
                (
                    cls.model_type,
                    cls.id_type,
                    cls.read_schema_type,
                    _,
                    _,
                ) = cast(
                    tuple[
                        type[ModelType],
                        type[IDType],
                        type[ReadSchemaType],
                        type[CreateSchemaType],
                        type[UpdateSchemaType],
                    ],
                    args,
                )
                break
        else:
            raise TypeError("DAO subclass must specify all generic type parameters")

        super().__init_subclass__()
