from typing import Annotated

from fastapi import APIRouter, Body, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.db.database import get_async_session

from .dao import RoleGroupDao
from .models import RoleGroupModel
from .schemas import CreateRoleGroupSchema, ReadRoleGroupSchema, UpdateRoleGroupSchema

router = APIRouter(prefix="/roles_group", tags=["role_group"])


@router.get(
    "/{role_group_id}",
)
async def get_role_group(
    role_group_id: int, session: Annotated[AsyncSession, Depends(get_async_session)]
) -> ReadRoleGroupSchema:
    return await RoleGroupDao.get_one_by_field(session, id=role_group_id)


@router.post("/")
async def create_role_group(
    role_group: Annotated[CreateRoleGroupSchema, Body()],
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    role_group_db = RoleGroupModel(title=role_group.title, group_id=role_group.group_id)
    new_role_group = await RoleGroupDao.create(session, role_group_db)

    return new_role_group


@router.patch("/{role_group_id}")
async def update_role_group(
    role_group_id: int,
    role_group: Annotated[UpdateRoleGroupSchema, Body()],
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    await RoleGroupDao.update(
        session, role_group.model_dump(exclude_none=True), id=role_group_id
    )

    return JSONResponse(status_code=200, content={"message": "Group updated"})


@router.delete("/{role_group_id}")
async def delete_role_group(
    role_group_id: int,
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    await RoleGroupDao.delete(session, role_group_id)

    return JSONResponse(status_code=200, content={"message": "Group deleted"})
