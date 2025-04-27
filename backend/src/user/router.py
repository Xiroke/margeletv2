from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, UploadFile
from fastapi.responses import JSONResponse, Response
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.database import get_async_session
from src.infrastructure.s3 import s3_bucket_service_factory
from src.utils.image_utils import save_image_in_s3

from .dao import UserDAO

# search include router in auth router.py
router = APIRouter(prefix="/users", tags=["users"])


@router.get("/avatar/{group_uuid}")
async def load_avatar(
    group_uuid: UUID, s3: Annotated[s3_bucket_service_factory, Depends()]
):
    response = await s3.get_file_object(f"users/{group_uuid}.jpg")

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
    prefix = await save_image_in_s3("users", group_uuid, image, s3)
    await UserDAO.update(session, {"avatar_path": prefix}, id=group_uuid)
    return JSONResponse(status_code=200, content={"message": "Avatar uploaded"})
