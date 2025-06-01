from typing import Any, Generic, Protocol, cast, get_args
from uuid import UUID

from beanie import Document
from sqlalchemy import delete, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.db.database import Base
from src.utils.exeptions import ModelNotFoundException
from src.utils.types import (
    CreateSchemaType,
    ModelType,
    ReadSchemaType,
    UpdateSchemaType,
)


class DaoProtocol(
    Protocol[ModelType, ReadSchemaType, CreateSchemaType, UpdateSchemaType]
):
    """Abstract class for Dao"""

    async def get_one_by_id(self, id: UUID) -> ReadSchemaType: ...

    async def get_one_by_field(self, *filter) -> ReadSchemaType:
        """You should pass filter as Model.id == id"""
        ...

    async def get_many_by_field(self, *filter) -> list[ReadSchemaType]:
        """You should pass filter as Model.id == id"""
        ...

    async def get_all(self) -> list[ReadSchemaType]: ...

    async def create(self, obj: CreateSchemaType) -> ReadSchemaType: ...

    async def update(self, obj: UpdateSchemaType) -> ReadSchemaType:
        """Pass id in values, You should pass filter as Model.id == id"""
        ...

    async def delete(self, id: UUID) -> bool: ...


class Dao(Generic[ModelType, ReadSchemaType, CreateSchemaType, UpdateSchemaType]):
    """Use for dao logic, also used for dao service"""

    model_type: Any
    read_schema_type: type[ReadSchemaType]

    def __init_subclass__(cls) -> None:
        # used in sublass of DAO
        # __init_subclass__ is called when subclass is initialized
        # __orig_bases__ return all class inheritance
        # if we not pass type in generic we will get error
        if not hasattr(cls, "__orig_bases__"):
            raise ValueError("Repository must be implements")
        # get first generic class (SqlDaoImpl[ModelType, ReadSchemaType, CreateSchemaType, UpdateSchemaType])
        base_dao_generic, *_ = cls.__orig_bases__  # type: ignore
        # we garant that types in generic are correct
        cls.model_type, cls.read_schema_type, *_ = cast(
            tuple[
                type[ModelType],
                type[ReadSchemaType],
                type[CreateSchemaType],
                type[UpdateSchemaType],
            ],
            get_args(base_dao_generic),
        )
        return super().__init_subclass__()


class SqlDaoImpl(Dao[ModelType, ReadSchemaType, CreateSchemaType, UpdateSchemaType]):
    """Sql implementation of Dao with default crud methods"""

    model_type: type[Base]

    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_one_by_id(self, id: UUID) -> ReadSchemaType:
        result = await self.session.execute(
            select(self.model_type).filter(self.model_type.id == id)
        )

        record = result.scalar_one_or_none()

        if record is None:
            raise ModelNotFoundException(self.model_type.__name__, id)

        return self.read_schema_type.model_validate(record)

    async def get_one_by_field(self, *filter) -> ReadSchemaType:
        result = await self.session.execute(select(self.model_type).filter(*filter))

        record = result.scalar_one_or_none()

        if record is None:
            raise ModelNotFoundException(self.model_type.__name__, id)

        return self.read_schema_type.model_validate(result.scalar_one())

    async def get_many_by_field(self, *filter) -> list[ReadSchemaType]:
        result = await self.session.execute(select(self.model_type).filter(*filter))
        return [self.read_schema_type.model_validate(i) for i in result.scalars().all()]

    async def get_all(self) -> list[ReadSchemaType]:
        result = await self.session.execute(select(self.model_type))
        return [self.read_schema_type.model_validate(i) for i in result.scalars().all()]

    async def create(self, obj: CreateSchemaType) -> ReadSchemaType:
        obj_model = self.model_type(**obj.model_dump())
        self.session.add(obj_model)
        await self.session.commit()
        await self.session.refresh(obj_model)
        return self.read_schema_type.model_validate(obj_model)

    async def update(self, obj: UpdateSchemaType) -> ReadSchemaType:
        result = await self.session.execute(
            update(self.model_type)
            .filter(self.model_type.id == id)
            .values(obj.model_dump(exclude={"id"}, exclude_unset=True))
            .returning(self.model_type),
        )
        await self.session.commit()
        return self.read_schema_type.model_validate(result.scalar_one())

    async def delete(self, id: UUID) -> bool:
        await self.session.execute(
            delete(self.model_type).filter(self.model_type.id == id)
        )  # type: ignore
        await self.session.commit()
        return True


class MongoDaoImpl(Dao[ModelType, ReadSchemaType, CreateSchemaType, UpdateSchemaType]):
    """Mongo implementation of Dao with default crud methods"""

    model_type: type[Document]

    async def get_one_by_id(self, id: UUID) -> ReadSchemaType:
        result = await self.model_type.get(id, fetch_links=True)

        if result is None:
            raise ModelNotFoundException(self.model_type.__name__, id)

        return self.read_schema_type.model_validate(result)

    async def get_one_by_field(self, *filter) -> ReadSchemaType:
        result = await self.model_type.find_one(*filter, fetch_links=True)

        if result is None:
            raise ModelNotFoundException(self.model_type.__name__, id)

        return self.read_schema_type.model_validate(result)

    async def get_many_by_field(self, *filter) -> list[ReadSchemaType]:
        result = await self.model_type.find(*filter, fetch_links=True).to_list()
        return [self.read_schema_type.model_validate(i) for i in result]

    async def get_all(self) -> list[ReadSchemaType]:
        result = await self.model_type.find(fetch_links=True).to_list()
        return [self.read_schema_type.model_validate(i) for i in result]

    async def create(self, obj: CreateSchemaType) -> ReadSchemaType:
        obj_model = self.model_type(**obj.model_dump())
        result = await obj_model.insert()
        return self.read_schema_type.model_validate(result)

    async def update(self, obj: UpdateSchemaType) -> ReadSchemaType:
        obj_model = await self.model_type.find_one(obj.id == id)

        if obj_model is None:
            raise ModelNotFoundException(self.model_type.__name__, id)

        result = await obj_model.update(
            obj.model_dump(exclude={"id"}, exclude_unset=True)
        )

        return self.read_schema_type.model_validate(result)

    async def delete(self, id: UUID) -> bool:
        result = await self.model_type.get(id)

        if result is None:
            raise ModelNotFoundException(self.model_type.__name__, id)

        await result.delete()

        return True
