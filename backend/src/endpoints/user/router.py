from fastapi import APIRouter, UploadFile
from fastapi.responses import JSONResponse, Response

from src.endpoints.auth.depends import current_user
from src.endpoints.user.models import UserModel
from src.endpoints.user.permissions import user_permission
from src.endpoints.user.schemas import UpdateUserSchema

from .depends import user_service_factory

# search include router in auth router.py
router = APIRouter(prefix="/users", tags=["users"])


@router.get("/avatar/me")
async def load_avatar(
    user: current_user,
    user_service: user_service_factory,
    permission: user_permission,
):
    await permission.is_has_value_model(user.id, "avatar_path")

    response = await user_service.load_avatar(f"/users/{user.id}.jpg")

    return Response(content=response, media_type="image/png")


@router.post("/avatar/me")
async def upload_avatar(
    user: current_user,
    user_service: user_service_factory,
    permission: user_permission,
    image: UploadFile,
):
    await permission.check_exist_by_id(user.id, UserModel)

    path = f"users/{str(user.id)}.jpg"
    await user_service.upload_avatar(path, image)
    await user_service.update(UpdateUserSchema(id=user.id, avatar_path=path))
    return JSONResponse(status_code=200, content={"message": "Avatar uploaded"})
