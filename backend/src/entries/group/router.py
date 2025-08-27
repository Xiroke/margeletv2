import logging

from fastapi import APIRouter

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/groups", tags=["group"])


# @router.get("/user_groups/me")
# async def get_groups_by_user(
#     user: CurrentUserDep,
#     group_service: GroupServiceDep,
# ) -> list[ReadGroupSchema]:
#     return await group_service.get_groups_by_user(user.id)


# @router.get("/avatar")
# async def load_avatar(
#     group_id: UUID,
#     group_service: GroupServiceDep,
# ) -> Response:
#     response = await group_service.load_avatar(f"/groups/{group_id}_avatar.jpg")

#     return Response(content=response, media_type="image/png")


# @router.post("/avatar/{group_id}", dependencies=perms(["r:can_edit_group_settings"]))
# async def upload_avatar(
#     group_id: UUID,
#     image: UploadFile,
#     group_service: GroupServiceDep,
# ):
#     path = f"groups/{str(group_id)}_avatar.jpg"
#     await group_service.upload_avatar(path, image)
#     await group_service.update(group_id, UpdateGroupSchema(avatar_path=path))
#     return JSONResponse(status_code=200, content={"message": "Avatar uploaded"})


# @router.get("/invite", dependencies=perms(["r:can_invite"]))
# async def get_invite_token(
#     group_id: UUID,
#     user: CurrentUserDep,
#     jwt: JwtManagerInvitationDep,
# ):
#     token = jwt.encode(
#         InvitationTokenSchema.model_validate(
#             {"group_id": str(group_id), "user_id": str(user.id)}
#         )
#     )
#     return token


# @router.post("/invite")
# async def join_group(
#     token: Annotated[str, Body()],
#     user: CurrentUserDep,
#     group_service: GroupServiceDep,
#     role_service: RoleServiceDep,
#     jwt: JwtManagerInvitationDep,
# ):
#     payload = jwt.decode(token)
#     # group where user will join
#     group_payload_id = UUID(payload.group_id)

#     await group_service.add_user_to_group(group_payload_id, user.id)
#     newbie_role = await role_service.src.core.abstract.dao(
#         RoleModel.title == "newbie", RoleModel.group_id == group_payload_id
#     )
#     await group_service.add_role_to_user(user.id, newbie_role.id)

#     return JSONResponse(status_code=200, content={"message": "Group joined"})


# @router.post("/leave/{group_id}")
# async def leave_group(
#     user: CurrentUserDep,
#     group_id: UUID,
#     group_service: GroupServiceDep,
# ):
#     await group_service.leave_group(group_id, user.id)

#     return JSONResponse(status_code=200, content={"message": "Group left"})


# @router.get("/user_groups/me")
# async def get_my_groups(
#     user: CurrentUserDep, group_service: GroupServiceDep
# ) -> list[ReadGroupSchema]:
#     return await group_service.get_groups_by_user(user.id)


# @router.patch("/title", dependencies=perms(["r:can_edit_group_settings"]))
# async def update_group_title(
#     group_id: UUID,
#     group_title: Annotated[str, Body()],
#     group_service: GroupServiceDep,
# ) -> ReadGroupSchema:
#     return await group_service.update(group_id, UpdateGroupSchema(title=group_title))
