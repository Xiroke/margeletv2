from sqlalchemy import delete, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.db.database import Base
from src.core.types import (
    CreateSchemaType,
    IDType,
    ModelType,
    ReadSchemaType,
    UpdateSchemaType,
)
from src.utils.exceptions import ModelNotFoundException

from .dao import Dao


class SqlDaoImpl(
    Dao[
        ModelType,
        IDType,
        ReadSchemaType,
        CreateSchemaType,
        UpdateSchemaType,
    ],
):
    """Sql implementation of Dao with default crud methods"""

    model_type: type[Base]

    def __init__(self, session: AsyncSession):
        self.session = session

    async def get(self, id: IDType) -> ReadSchemaType:
        stmt = select(self.model_type).filter_by(id=id)
        result = await self.session.execute(stmt)

        record = result.scalar_one_or_none()

        if record is None:
            raise ModelNotFoundException(self.model_type.__name__, id)

        return self.read_schema_type.model_validate(record)

    async def get_many(self, ids) -> list[ReadSchemaType]:
        stmt = select(self.model_type).filter(self.model_type.id.in_(ids))
        result = await self.session.execute(stmt)
        return [self.read_schema_type.model_validate(i) for i in result.scalars().all()]

    async def create(self, obj: CreateSchemaType) -> ReadSchemaType:
        obj_model = self.model_type(**obj.model_dump())
        self.session.add(obj_model)
        await self.session.flush()
        await self.session.refresh(obj_model)
        return self.read_schema_type.model_validate(obj_model)

    async def update(self, id: IDType, obj: UpdateSchemaType) -> ReadSchemaType:
        smtp = (
            update(self.model_type)
            .filter_by(id=id)
            .values(obj.model_dump(exclude_unset=True))
            .returning(self.model_type)
        )
        result = await self.session.execute(smtp)
        await self.session.flush()
        return self.read_schema_type.model_validate(result.scalar_one())

    async def delete(self, id: IDType) -> bool:
        await self.session.execute(delete(self.model_type).filter_by(id=id))  # type: ignore
        await self.session.flush()
        return True
