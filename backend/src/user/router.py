from fastapi import APIRouter, UploadFile
from fastapi.responses import JSONResponse, Response

from .depends import current_active_user_factory, user_service_factory

# search include router in auth router.py
router = APIRouter(prefix="/users", tags=["users"])


@router.get("/avatar/me")
async def load_avatar(
    current_user: current_active_user_factory, user_service: user_service_factory
):
    permission = await user_service.permission_manager()
    await permission.is_has_value("avatar_path")

    response = await user_service.load_avatar(f"/users/{current_user.id}.jpg")

    return Response(content=response, media_type="image/png")


@router.post("/avatar/me")
async def upload_avatar(
    current_user: current_active_user_factory,
    user_service: user_service_factory,
    image: UploadFile,
):
    permission = await user_service.permission_manager()
    await permission.is_exist(current_user.id)

    path = await user_service.upload_avatar(f"users/{str(current_user.id)}", image)
    await user_service.update({"avatar_path": path}, id=current_user.id)
    return JSONResponse(status_code=200, content={"message": "Avatar uploaded"})
