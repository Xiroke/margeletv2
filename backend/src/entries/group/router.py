import logging
from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Body, UploadFile
from fastapi.responses import JSONResponse, Response

from src.entries.auth.depends import CurrentUserDep
from src.entries.auth.user.depends import UserServiceDep
from src.entries.role.depends import RoleServiceDep
from src.entries.role.models import (
    RoleModel,
    RolePermissionsEnum,
    creator_permissions,
    newbie_permissions,
)
from src.entries.role.permissions import role_permission
from src.entries.role.schemas import CreateRoleSchema

from .depends import GroupServiceDep, JwtManagerInvitationDep
from .models import GroupModel
from .schemas import (
    CreateGroupSchema,
    InvitationTokenSchema,
    ReadGroupSchema,
    UpdateGroupSchema,
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/groups", tags=["group"])


@router.get("/user_groups/me")
async def get_groups_by_user(
    user: CurrentUserDep,
    group_service: GroupServiceDep,
) -> list[ReadGroupSchema]:
    return await group_service.get_groups_by_user(user.id)


@router.get("/avatar/{group_id}")
async def load_avatar(
    group_id: UUID,
    permission: group_permission,
    group_service: GroupServiceDep,
) -> Response:
    await permission.is_has_value_model(group_id, "avatar_path")

    response = await group_service.load_avatar(f"/groups/{group_id}_avatar.jpg")

    return Response(content=response, media_type="image/png")


@router.post("/avatar/{group_id}")
async def upload_avatar(
    group_id: UUID,
    image: UploadFile,
    permission: group_permission,
    group_service: GroupServiceDep,
    role_perm: role_permission,
    user: CurrentUserDep,
):
    await role_perm.check_user_has_permission(
        RolePermissionsEnum.CAN_EDIT_GROUP_SETTINGS, user.id, group_id
    )

    await permission.check_exist_by_id(group_id, GroupModel)

    path = f"groups/{str(group_id)}_avatar.jpg"
    await group_service.upload_avatar(path, image)
    await group_service.update(group_id, UpdateGroupSchema(avatar_path=path))
    return JSONResponse(status_code=200, content={"message": "Avatar uploaded"})


@router.get("/invite/{group_id}")
async def get_invite_token(
    group_id: UUID,
    user: CurrentUserDep,
    group_perm: group_permission,
    jwt: JwtManagerInvitationDep,
    role_perm: role_permission,
):
    await role_perm.check_user_has_permission(
        RolePermissionsEnum.CAN_INVITE, user.id, group_id
    )

    await group_perm.check_exist_by_id(group_id, GroupModel)

    token = jwt.encode(
        InvitationTokenSchema.model_validate(
            {"group_id": str(group_id), "user_id": str(user.id)}
        )
    )
    return token


@router.post("/invite")
async def join_group(
    token: Annotated[str, Body()],
    user: CurrentUserDep,
    user_service: UserServiceDep,
    group_service: GroupServiceDep,
    role_service: RoleServiceDep,
    jwt: JwtManagerInvitationDep,
    role_perm: role_permission,
):
    payload = jwt.decode(token)
    # user who generate this token
    user_payload_id = UUID(payload.user_id)
    # group where user will join
    group_payload_id = UUID(payload.group_id)
    user_creator_token = await user_service.get(user_payload_id)

    await role_perm.check_user_has_permission(
        RolePermissionsEnum.CAN_INVITE, user_creator_token.id, group_payload_id
    )

    await group_service.add_user_to_group(group_payload_id, user.id)
    newbie_role = await role_service.src.core.abstract.dao(
        RoleModel.title == "newbie", RoleModel.group_id == group_payload_id
    )
    await group_service.add_role_to_user(user.id, newbie_role.id)

    return JSONResponse(status_code=200, content={"message": "Group joined"})


@router.post("/leave/{group_id}")
async def leave_group(
    user: CurrentUserDep,
    group_id: UUID,
    group_service: GroupServiceDep,
):
    await group_service.leave_group(group_id, user.id)

    return JSONResponse(status_code=200, content={"message": "Group left"})


@router.get("/user_groups/me")
async def get_my_groups(
    user: CurrentUserDep, group_service: GroupServiceDep
) -> list[ReadGroupSchema]:
    return await group_service.get_groups_by_user(user.id)


@router.patch("/title/{group_id}")
async def update_group_title(
    group_id: UUID,
    group_title: Annotated[str, Body()],
    group_service: GroupServiceDep,
    user: CurrentUserDep,
    role_perm: role_permission,
) -> ReadGroupSchema:
    await role_perm.check_user_has_permission(
        RolePermissionsEnum.CAN_EDIT_GROUP_SETTINGS, user.id, group_id
    )
    return await group_service.update(group_id, UpdateGroupSchema(title=group_title))


@router.get(
    "/{group_id}",
)
async def get_group(
    group_id: UUID,
    group_service: GroupServiceDep,
) -> ReadGroupSchema:
    return await group_service.get(group_id)


@router.post("/")
async def create_group(
    group: Annotated[CreateGroupSchema, Body()],
    user: CurrentUserDep,
    group_service: GroupServiceDep,
    role_service: RoleServiceDep,
) -> ReadGroupSchema:
    result = await group_service.create(group, user.id)
    # Create base user roles
    creator_role = await role_service.create(
        CreateRoleSchema(
            title="creator",
            group_id=result.id,
            permissions=creator_permissions,
        )
    )
    newbie_role = await role_service.create(
        CreateRoleSchema(
            title="newbie",
            group_id=result.id,
            permissions=newbie_permissions,
        )
    )
    await group_service.add_role_to_user(user.id, creator_role.id)
    await group_service.add_role_to_user(user.id, newbie_role.id)

    return result


@router.patch("/{group_id}")
async def update_group(
    group_id: UUID,
    group: Annotated[UpdateGroupSchema, Body()],
    group_service: GroupServiceDep,
    user: CurrentUserDep,
    role_perm: role_permission,
) -> ReadGroupSchema:
    await role_perm.check_user_has_permission(
        RolePermissionsEnum.CAN_EDIT_GROUP_SETTINGS, user.id, group_id
    )
    return await group_service.update(group_id, UpdateGroupSchema(**group.model_dump()))


@router.delete("/{group_id}")
async def delete_group(
    group_id: UUID,
    group_service: GroupServiceDep,
    user: CurrentUserDep,
    role_perm: role_permission,
):
    await role_perm.check_user_has_permission(
        RolePermissionsEnum.CAN_ALL, user.id, group_id
    )

    await group_service.delete(group_id)

    return JSONResponse(status_code=200, content={"message": "Group deleted"})
