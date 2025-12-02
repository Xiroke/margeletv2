import logging
from uuid import UUID

from fastapi import APIRouter

from src.entries.auth.depends import CurrentUserDep
from src.entries.group.depends import AutoGroupDep, JwtManagerInvitationDep
from src.entries.group.group.depends import GroupServiceDep
from src.entries.group.role.depends import RoleServiceDep
from src.entries.group.schemas import (
    AutoGroupRead,
    AutoGroupsAndMessagesRead,
    InvitationTokenSchema,
)
from src.entries.message.depends import MessageServiceDep

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/groups", tags=["group"])

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
#     await group_service.update(group_id, GroupUpdate(avatar_path=path))
#     return JSONResponse(status_code=200, content={"message": "Avatar uploaded"})


@router.get("/invite-token")
async def get_invite_token(
    group_id: UUID,
    user: CurrentUserDep,
    jwt: JwtManagerInvitationDep,
):
    token = jwt.encode(
        InvitationTokenSchema.model_validate(
            {"group_id": str(group_id), "user_id": str(user.id)}
        )
    )
    return token


@router.post("/invite-token")
async def join_group_by_invite_token(
    token: str,
    user: CurrentUserDep,
    group_service: GroupServiceDep,
    role_service: RoleServiceDep,
    jwt: JwtManagerInvitationDep,
):
    payload = jwt.decode(token)
    # group where user will join
    group_payload_id = UUID(payload.group_id)

    await group_service.add_user_to_group(group_payload_id, user.id)
    member_role = await role_service.get(title="Newbie", group_id=group_payload_id)
    await group_service.add_role_to_user(user.id, group_payload_id, member_role.id)

    return {"message": "Group joined"}


@router.post("/invite/{group_id}")
async def join_groug(
    group_id: UUID,
    user: CurrentUserDep,
    group_service: GroupServiceDep,
    role_service: RoleServiceDep,
):
    await group_service.add_user_to_group(group_id, user.id)
    member_role = await role_service.get_in_group(title="Newbie", group_id=group_id)
    await group_service.add_role_to_user(user.id, group_id, member_role.id)

    return {"message": "Group joined"}


@router.post("/leave/{group_id}")
async def leave_group(
    user: CurrentUserDep,
    group_id: UUID,
    group_service: GroupServiceDep,
):
    await group_service.remove_user_from_group(group_id, user.id)

    return {"message": "Group left"}


@router.get("/{group_id}")
async def get_group(
    group_id: UUID,
    group_service: GroupServiceDep,
    current_user: CurrentUserDep,
) -> AutoGroupRead:
    return await group_service.get_polymophic(id=group_id, user_id=current_user.id)


@router.get("/{group_id}/members/count")
async def get_group_members_count(
    group_id: UUID,
    group_service: GroupServiceDep,
) -> int:
    return await group_service.get_user_count_in_group(group_id)


@router.get("/me/groups")
async def get_my_group(
    user: CurrentUserDep,
    group_service: AutoGroupDep,
) -> list[AutoGroupRead]:
    return await group_service.get_groups_by_user(user.id)


@router.get("/me/with_last_message")
async def get_my_groups_with_last_message(
    user: CurrentUserDep,
    service: AutoGroupDep,
    message_service: MessageServiceDep,
) -> AutoGroupsAndMessagesRead:
    groups = await service.get_groups_by_user(user.id)
    group_ids = [group.id for group in groups]
    messages = await message_service.get_last_message_in_groups(group_ids)
    return AutoGroupsAndMessagesRead(messages=messages, groups=groups)


@router.delete("/{group_id}")
async def delete_group(
    group_id: UUID,
    group_service: AutoGroupDep,
):
    return await group_service.delete(id=group_id)
