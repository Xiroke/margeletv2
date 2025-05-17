import logging
from typing import Annotated
from uuid import UUID

import jwt
from fastapi import APIRouter, Body, Depends, HTTPException, UploadFile
from fastapi.responses import JSONResponse, Response
from sqlalchemy.ext.asyncio import AsyncSession

from config import settings
from src.auth.users import current_active_user
from src.db.database import get_async_session
from src.db.models import UserModel
from src.infrastructure.s3 import S3BucketService, s3_bucket_service_factory
from src.user.dao import UserDAO
from src.utils.image_utils import save_image_in_s3

from .dao import GroupDAO
from .models import GroupModel
from .schemas import CreateGroupSchema, ReadGroupSchema, UpdateGroupSchema

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/groups", tags=["group"])


@router.get("/avatar/{group_id}")
async def get_avatar(
    group_id: UUID,
    session: Annotated[AsyncSession, Depends(get_async_session)],
    s3: Annotated[S3BucketService, Depends(s3_bucket_service_factory)],
) -> Response:
    group: GroupModel | None = await GroupDAO.get_one_or_none_by_field(
        session, id=group_id
    )

    if group is None:
        raise HTTPException(status_code=404, detail="Group not found")

    if not group.avatar_path:
        raise HTTPException(status_code=404, detail="Avatar not found")

    response = await s3.get_file_object("groups", f"{group_id}_avatar.jpg")

    if response is None:
        raise HTTPException(status_code=404, detail="Avatar not found")

    return Response(content=response, media_type="image/png")


@router.post("/avatar/{group_id}")
async def upload_avatar(
    group_id: UUID,
    image: UploadFile,
    session: Annotated[AsyncSession, Depends(get_async_session)],
    s3: Annotated[S3BucketService, Depends(s3_bucket_service_factory)],
):
    prefix = await save_image_in_s3("groups", str(group_id) + "_avatar", image, s3)
    await GroupDAO.update(session, {"avatar_path": prefix}, id=group_id)
    return JSONResponse(status_code=200, content={"message": "Avatar uploaded"})


@router.get("/panorama/{group_id}")
async def load_panorama(
    group_id: UUID,
    session: Annotated[AsyncSession, Depends(get_async_session)],
    s3: Annotated[S3BucketService, Depends(s3_bucket_service_factory)],
) -> Response:
    group: GroupModel | None = await GroupDAO.get_one_or_none_by_field(
        session, id=group_id
    )

    if group is None:
        raise HTTPException(status_code=404, detail="Group not found")

    if not group.panorama_path:
        raise HTTPException(status_code=404, detail="Avatar not found")

    response = await s3.get_file_object("groups", f"{group_id}_panorama.jpg")

    if response is None:
        raise HTTPException(status_code=404, detail="Avatar not found")

    return Response(content=response, media_type="image/png")


@router.post("/panorama/{group_id}")
async def upload_panorama(
    group_id: UUID,
    image: UploadFile,
    session: Annotated[AsyncSession, Depends(get_async_session)],
    s3: Annotated[S3BucketService, Depends(s3_bucket_service_factory)],
):
    prefix = await save_image_in_s3("groups", str(group_id) + "_panorama", image, s3)
    await GroupDAO.update(session, {"panorama_path": prefix}, id=group_id)
    return JSONResponse(status_code=200, content={"message": "Avatar uploaded"})


@router.get("/invite/{group_id}")
async def get_invite_token(
    group_id: UUID,
    current_user: Annotated[UserModel, Depends(current_active_user)],
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    group = await GroupDAO.get_one_or_none_by_field(session, id=group_id)
    if group is None:
        raise HTTPException(status_code=404, detail="Group not found")
    token = jwt.encode(
        {"group_id": str(group.id), "user_id": str(current_user.id)},
        settings.INVITE_TOKEN_JWT,
        algorithm="HS256",
    )
    return token


@router.post("/invite")
async def join_group(
    token: Annotated[str, Body()],
    current_user: Annotated[UserModel, Depends(current_active_user)],
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    try:
        payload = jwt.decode(token, settings.INVITE_TOKEN_JWT, algorithms=["HS256"])
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=400, detail="Invalid token")  # noqa: B904

    try:
        user_creatur_token = await UserDAO.get_one_or_none_by_field(
            session, id=payload["user_id"]
        )
        await GroupDAO.is_user_in_group(
            session, user_creatur_token.id, payload["group_id"]
        )

    except Exception:
        raise HTTPException(status_code=400, detail="Invalid token")

    await GroupDAO.add_user_to_group(session, payload["group_id"], current_user.id)

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
    "/{group_id}",
)
async def get_group(
    group_id: UUID, session: Annotated[AsyncSession, Depends(get_async_session)]
) -> ReadGroupSchema:
    return await GroupDAO.get_one_or_none_by_field(session, id=group_id)


@router.post("/")
async def create_group(
    user: Annotated[UserModel, Depends(current_active_user)],
    group: Annotated[CreateGroupSchema, Body()],
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    group_db = GroupModel(title=group.title)
    new_group = await GroupDAO.create(session, group_db, user_id=user.id)
    return new_group


@router.patch("/{group_id}")
async def update_group(
    group_id: UUID,
    group: Annotated[UpdateGroupSchema, Body()],
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    await GroupDAO.update(session, group.model_dump(exclude_none=True), id=group_id)

    return JSONResponse(status_code=200, content={"message": "Group updated"})


@router.delete("/{group_id}")
async def delete_group(
    group_id: UUID,
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    await GroupDAO.delete(session, group_id)

    return JSONResponse(status_code=200, content={"message": "Group deleted"})
