from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Body
from fastapi.responses import JSONResponse

from src.endpoints.auth.depends import current_user

from .depends import role_service_factory
from .models import RoleModel, RolePermissionsEnum
from .schemas import CreateRoleSchema, ReadRoleSchema, UpdateRoleSchema

router = APIRouter(prefix="/roles_group", tags=["role"])


@router.get(
    "/{role_id}",
)
async def get_role(role_id: UUID, role_service: role_service_factory) -> ReadRoleSchema:
    return ReadRoleSchema.model_validate(await role_service.get_one_by_field(role_id))


@router.post("/{group_id}")
async def create_role(
    group_id: UUID,
    user: current_user,
    role: Annotated[CreateRoleSchema, Body()],
    role_service: role_service_factory,
) -> ReadRoleSchema:
    await role_service.permission.check_user_has_permission(
        RolePermissionsEnum.CAN_EDIT_ROLES.value, user.id, group_id
    )

    role_db = RoleModel(**role.model_dump(), group_id=group_id)
    new_role = await role_service.create(role_db)

    return ReadRoleSchema.model_validate(new_role)


@router.patch("/{group_id}/{role_id}")
async def update_role(
    role_id: UUID,
    group_id: UUID,
    user: current_user,
    role: Annotated[UpdateRoleSchema, Body()],
    role_service: role_service_factory,
):
    await role_service.permission.check_user_has_permission(
        RolePermissionsEnum.CAN_EDIT_ROLES.value, user.id, group_id
    )

    await role_service.update_one_by_id(role.model_dump(exclude_none=True), id=role_id)

    return JSONResponse(status_code=200, content={"message": "Group updated"})


@router.delete("/{role_id}")
async def delete_role(
    role_id: UUID,
    role_service: role_service_factory,
):
    await role_service.delete(role_id)

    return JSONResponse(status_code=200, content={"message": "Group deleted"})
