from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Body
from fastapi.responses import JSONResponse

from src.endpoints.auth.depends import current_user
from src.endpoints.role.permissions import role_permission

from .depends import role_service_factory
from .models import RolePermissionsEnum
from .schemas import CreateRoleSchema, ReadRoleSchema, UpdateRoleSchema

router = APIRouter(prefix="/roles_group", tags=["role"])


@router.get(
    "/{role_id}",
)
async def get_role(role_id: UUID, role_service: role_service_factory) -> ReadRoleSchema:
    return ReadRoleSchema.model_validate(await role_service.get_one_by_field(role_id))


@router.get("/permissions/me/{group_id}")
async def get_my_permissions_in_group(
    role_service: role_service_factory, user: current_user, group_id: UUID
):
    await role_service.get_user_permissions_in_group(user.id, group_id)


@router.post("/{group_id}")
async def create_role(
    group_id: UUID,
    user: current_user,
    role: Annotated[CreateRoleSchema, Body()],
    role_service: role_service_factory,
    permission: role_permission,
) -> ReadRoleSchema:
    await permission.check_user_has_permission(
        RolePermissionsEnum.CAN_EDIT_ROLES, user.id, group_id
    )

    role.group_id = group_id
    new_role = await role_service.create(role)

    return ReadRoleSchema.model_validate(new_role)


@router.patch("/{group_id}/{role_id}")
async def update_role(
    role_id: UUID,
    group_id: UUID,
    user: current_user,
    role: Annotated[UpdateRoleSchema, Body()],
    role_service: role_service_factory,
    permission: role_permission,
):
    await permission.check_user_has_permission(
        RolePermissionsEnum.CAN_EDIT_ROLES, user.id, group_id
    )

    await role_service.update(
        UpdateRoleSchema(
            id=role_id,
            **role.model_dump(exclude_none=True),
        )
    )

    return JSONResponse(status_code=200, content={"message": "Group updated"})


@router.delete("/{role_id}")
async def delete_role(
    role_id: UUID,
    role_service: role_service_factory,
    permission: role_permission,
):
    await permission.check_user_has_permission(
        RolePermissionsEnum.CAN_EDIT_ROLES, user.id, group_id
    )

    await role_service.delete(role_id)

    return JSONResponse(status_code=200, content={"message": "Group deleted"})
