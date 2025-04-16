from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, UploadFile, HTTPException, Body
from fastapi.responses import JSONResponse, Response
from sqlalchemy.ext.asyncio import AsyncSession
import jwt

from src.db.database import get_async_session
from src.utils.image_utils import save_image_in_s3
from src.dependencies.s3 import s3_bucket_service_factory
from src.auth.users import current_active_user
from src.db.models import UserModel
from config import settings
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


@router.get("/invite/{group_uuid}")
async def get_invite_token(
    group_uuid: UUID,
    current_user: Annotated[UserModel, Depends(current_active_user)],
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    group = await GroupDAO.get_one_by_field(session, id=group_uuid)
    if group is None:
        raise HTTPException(status_code=404, detail="Group not found")
    token = jwt.encode(
        {"group_id": group.id, "user_id": current_user.id},
        settings.INVITE_TOKEN_JWT,
        algorithm="HS256",
    )
    return token


@router.post("/invite/{group_id}")
async def join_group(
    group_id: UUID,
    token: Annotated[str, Body()],
    current_user: Annotated[UserModel, Depends(current_active_user)],
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    try:
        payload = jwt.decode(token, settings.INVITE_TOKEN_JWT, algorithms=["HS256"])
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=400, detail="Invalid token")  # noqa: B904
    if payload["group_id"] != group_id:
        raise HTTPException(status_code=400, detail="Invalid token")

    await GroupDAO.add_user_to_group(session, group_id, current_user.id)

    return JSONResponse(status_code=200, content={"message": "Group joined"})


@router.get("/user_groups/me")
async def get_my_groups(
    session: Annotated[AsyncSession, Depends(get_async_session)],
    user: Annotated[UserModel, Depends(current_active_user)],
):
    return await GroupDAO.get_user_groups(session, user_id=user.id)


@router.get("/user_groups/{user_id}")
async def get_user_groups(
    user_id: UUID,
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    return await GroupDAO.get_user_groups(session, user_id=user_id)


@router.get(
    "/{group_uuid}",
)
async def get_group(
    group_uuid: UUID, session: Annotated[AsyncSession, Depends(get_async_session)]
) -> ReadGroupSchema:
    return await GroupDAO.get_one_by_field(session, id=group_uuid)


@router.post("/")
async def create_group(
    user: Annotated[UserModel, Depends(current_active_user)],
    group: Annotated[CreateGroupSchema, Body()],
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    group_db = GroupModel(title=group.title)
    new_group = await GroupDAO.create(session, group_db, user_id=user.id)
    return new_group


@router.patch("/{group_uuid}")
async def update_group(
    group_uuid: UUID,
    group: Annotated[UpdateGroupSchema, Body()],
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
