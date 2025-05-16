from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, UploadFile
from fastapi.responses import JSONResponse, Response
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.database import get_async_session
from src.infrastructure.s3 import S3BucketService, s3_bucket_service_factory
from src.utils.image_utils import save_image_in_s3

from .dao import UserDAO

# search include router in auth router.py
router = APIRouter(prefix="/users", tags=["users"])


@router.get("/avatar/{group_id}")
async def load_avatar(
    group_id: UUID, s3: Annotated[S3BucketService, Depends(s3_bucket_service_factory)]
):
    response = await s3.get_file_object("users", f"{group_id}.jpg")

    if response is None:
        raise HTTPException(status_code=404, detail="Avatar not found")

    image = await response.read()

    return Response(content=image, media_type="image/png")


@router.post("/avatar/{group_id}")
async def upload_avatar(
    group_id: UUID,
    image: UploadFile,
    session: Annotated[AsyncSession, Depends(get_async_session)],
    s3: Annotated[S3BucketService, Depends(s3_bucket_service_factory)],
):
    prefix = await save_image_in_s3("users", str(group_id), image, s3)
    await UserDAO.update(session, {"avatar_path": prefix}, id=group_id)
    return JSONResponse(status_code=200, content={"message": "Avatar uploaded"})
