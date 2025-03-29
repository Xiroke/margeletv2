from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.models import GroupModel
from src.db.database import get_async_session
from .schemas import ReadGroupSchema, CreateGroupSchema, UpdateGroupSchema
from .dao import GroupDAO

router = APIRouter(prefix="/groups", tags=["group"])


@router.get(
    "/{group_uuid}",
)
async def get_groups(
    group_uuid: UUID, session: Annotated[AsyncSession, Depends(get_async_session)]
) -> ReadGroupSchema:
    return await GroupDAO.get_one_by_field(session, id=group_uuid)


@router.post("/")
async def create_group(
    group: Annotated[CreateGroupSchema, Depends()],
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    group_db = GroupModel(title=group.title)
    new_group = await GroupDAO.create(session, group_db)

    return new_group


@router.patch("/{group_uuid}")
async def update_group(
    group_uuid: UUID,
    group: Annotated[UpdateGroupSchema, Depends()],
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    await GroupDAO.update(session, group.model_dump(exclude_none=True), id=group_uuid)

    return JSONResponse(status_code=200, content={"message": "Group updated"})


@router.delete("/{group_uuid}")
async def delete_group(
    group_uuid: UUID,
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    await GroupDAO.delete(session, group_uuid)

    return JSONResponse(status_code=200, content={"message": "Group deleted"})
