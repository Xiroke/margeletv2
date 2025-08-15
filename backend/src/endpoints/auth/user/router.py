from fastapi import APIRouter, UploadFile
from fastapi.responses import JSONResponse, Response

from src.endpoints.auth.depends import CurrentUserDep
from src.endpoints.auth.user.schemas import UpdateUserSchema

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
