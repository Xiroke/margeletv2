import logging
from typing import Annotated
from uuid import UUID

import jwt
from fastapi import APIRouter, Body, UploadFile
from fastapi.responses import JSONResponse, Response

from config import settings
from src.endpoints.auth.depends import current_user

from .depends import group_service_factory
from .models import GroupModel
from .schemas import CreateGroupSchema, ReadGroupSchema, UpdateGroupSchema

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/groups", tags=["group"])


@router.get("/avatar/{group_id}")
async def load_avatar(
    group_id: UUID,
    group_service: group_service_factory,
) -> Response:
    permission = group_service.permission
    await permission.is_has_value_model(group_id, "avatar_path")

    response = await group_service.load_avatar(f"/groups/{group_id}_avatar.jpg")

    return Response(content=response, media_type="image/png")


@router.post("/avatar/{group_id}")
async def upload_avatar(
    group_id: UUID,
    image: UploadFile,
    group_service: group_service_factory,
):
    permission = group_service.permission
    await permission.check_exist_by_id(group_id, GroupModel)

    path = f"groups/{str(group_id)}_avatar.jpg"
    await group_service.upload_avatar(path, image)
    await group_service.update_one_by_id({"avatar_path": path}, group_id)
    return JSONResponse(status_code=200, content={"message": "Avatar uploaded"})


@router.get("/panorama/{group_id}")
async def load_panorama(
    group_id: UUID,
    group_service: group_service_factory,
) -> Response:
    permission = group_service.permission
    await permission.is_has_value_model(group_id, "avatar_path")

    response = await group_service.load_panorama(f"/groups/{group_id}_panorama.jpg")
    return Response(content=response, media_type="image/png")


@router.post("/panorama/{group_id}")
async def upload_panorama(
    group_id: UUID,
    image: UploadFile,
    group_service: group_service_factory,
):
    permission = group_service.permission
    await permission.check_exist_by_id(group_id, GroupModel)

    path = f"groups/{str(group_id)}_panorama.jpg"
    await group_service.upload_panorama(path, image)
    await group_service.update_one_by_id({"panorama_path": path}, group_id)
    return JSONResponse(status_code=200, content={"message": "Panorama uploaded"})


@router.get("/invite/{group_id}")
async def get_invite_token(
    group_id: UUID,
    user: current_user,
    group_service: group_service_factory,
):
    permission = group_service.permission
    await permission.check_exist_by_id(group_id, GroupModel)

    token = jwt.encode(
        {"group_id": str(group_id), "user_id": str(user.id)},
        settings.INVITE_TOKEN_JWT,
        algorithm="HS256",
    )
    return token


# @router.post("/invite")
# async def join_group(
#     token: Annotated[str, Body()],
#     user: Annotated[UserModel, Depends(current_active_user)],
#     session: Annotated[AsyncSession, Depends(get_async_session)],
# ):
#     try:
#         payload = jwt.decode(token, settings.INVITE_TOKEN_JWT, algorithms=["HS256"])
#     except jwt.InvalidTokenError:
#         raise HTTPException(status_code=400, detail="Invalid token")  # noqa: B904

#     try:
#         user_creatur_token = await UserDao.get_one_by_field(
#             session, id=payload["user_id"]
#         )
#         await GroupSqlDao.is_user_in_group(
#             session, user_creatur_token.id, payload["group_id"]
#         )

#     except Exception:
#         raise HTTPException(status_code=400, detail="Invalid token")

#     await GroupSqlDao.add_user_to_group(session, payload["group_id"], user.id)

#     return JSONResponse(status_code=200, content={"message": "Group joined"})


@router.get("/user_groups/me")
async def get_my_groups(
    user: current_user, group_service: group_service_factory
) -> list[ReadGroupSchema]:
    return [
        ReadGroupSchema.model_validate(i)
        for i in await group_service.get_user_groups(user.id)
    ]


@router.get("/user_groups/{user_id}")
async def get_user_groups(
    user_id: UUID,
    group_service: group_service_factory,
) -> list[ReadGroupSchema]:
    return [
        ReadGroupSchema.model_validate(i)
        for i in await group_service.get_user_groups(user_id=user_id)
    ]


@router.get(
    "/{group_id}",
)
async def get_group(
    group_id: UUID,
    group_service: group_service_factory,
) -> ReadGroupSchema:
    return ReadGroupSchema.model_validate(await group_service.get_one_by_id(group_id))


@router.post("/")
async def create_group(
    group: Annotated[CreateGroupSchema, Body()],
    user: current_user,
    group_service: group_service_factory,
) -> ReadGroupSchema:
    group_db = GroupModel(**group.model_dump(exclude_none=True))
    result = await group_service.create(group_db, user.id)
    return ReadGroupSchema.model_validate(result)


@router.patch("/{group_id}")
async def update_group(
    group_id: UUID,
    group: Annotated[UpdateGroupSchema, Body()],
    group_service: group_service_factory,
    user: current_user,
) -> ReadGroupSchema:
    result = await group_service.update_one_by_id(
        group.model_dump(exclude_none=True), group_id
    )
    return ReadGroupSchema.model_validate(result)


@router.delete("/{group_id}")
async def delete_group(
    group_id: UUID,
    group_service: group_service_factory,
):
    await group_service.delete(group_id)

    return JSONResponse(status_code=200, content={"message": "Group deleted"})
