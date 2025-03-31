from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, UploadFile, HTTPException
from fastapi.responses import JSONResponse, Response
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.database import get_async_session
from src.utils.image_utils import save_image_in_s3
from src.dependencies.s3 import s3_bucket_service_factory
from .schemas import ReadGroupSchema, CreateGroupSchema, UpdateGroupSchema
from .models import GroupModel
from .dao import GroupDAO

router = APIRouter(prefix="/groups", tags=["group"])


@router.get("/avatar/{group_uuid}")
async def get_avatar(
    group_uuid: UUID, s3: Annotated[s3_bucket_service_factory, Depends()]
):
    response = await s3.get_file_object(f"groups/{group_uuid}.jpg")

    if response is None:
        raise HTTPException(status_code=404, detail="Avatar not found")

    image = await response.read()

    return Response(content=image, media_type="image/png")


@router.post("/avatar/{group_uuid}")
async def upload_avatar(
    group_uuid: UUID,
    image: UploadFile,
    session: Annotated[AsyncSession, Depends(get_async_session)],
    s3: Annotated[s3_bucket_service_factory, Depends()],
):
    prefix = await save_image_in_s3("groups", group_uuid, image, s3)
    await GroupDAO.update(session, {"avatar_path": prefix}, id=group_uuid)
    return JSONResponse(status_code=200, content={"message": "Avatar uploaded"})


@router.get("/panorama/{group_uuid}")
async def load_panorama(
    group_uuid: UUID, s3: Annotated[s3_bucket_service_factory, Depends()]
):
    response = await s3.get_file_object(f"groups/{group_uuid}.jpg")

    if response is None:
        raise HTTPException(status_code=404, detail="Avatar not found")

    image = await response.read()

    return Response(content=image, media_type="image/png")


@router.post("/panorama/{group_uuid}")
async def upload_panorama(
    group_uuid: UUID,
    image: UploadFile,
    session: Annotated[AsyncSession, Depends(get_async_session)],
    s3: Annotated[s3_bucket_service_factory, Depends()],
):
    prefix = await save_image_in_s3("groups", group_uuid, image, s3)
    await GroupDAO.update(session, {"panorama_path": prefix}, id=group_uuid)
    return JSONResponse(status_code=200, content={"message": "Avatar uploaded"})


@router.get(
    "/{group_uuid}",
)
async def get_group(
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
