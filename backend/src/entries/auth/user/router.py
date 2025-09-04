from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Body, UploadFile
from fastapi.responses import JSONResponse, Response

from src.entries.auth.depends import CurrentUserDep
from src.entries.auth.user.schemas import UpdateUserSchema

from .depends import UserServiceDep

# search include router in auth router.py
router = APIRouter(prefix="/users", tags=["users"])


@router.get("/avatar/me")
async def load_avatar(
    user: CurrentUserDep,
    user_service: UserServiceDep,
):
    response = await user_service.load_avatar(f"/users/{user.id}.jpg")

    return Response(content=response, media_type="image/png")


@router.post("/avatar/me")
async def upload_avatar(
    user: CurrentUserDep,
    user_service: UserServiceDep,
    image: UploadFile,
):
    path = f"users/{str(user.id)}.jpg"
    await user_service.upload_avatar(path, image)
    await user_service.update(user.id, UpdateUserSchema(avatar_path=path))
    return JSONResponse(status_code=200, content={"message": "Avatar uploaded"})


@router.post("/usernames")
async def get_usernames_by_id(
    user_service: UserServiceDep, user_ids: Annotated[list[UUID], Body()]
) -> dict[str, str]:
    """Returns user names by id"""
    return await user_service.get_usernames_by_id(user_ids)
