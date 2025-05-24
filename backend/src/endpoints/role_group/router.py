from typing import Annotated

from fastapi import APIRouter, Body
from fastapi.responses import JSONResponse

from .depends import role_group_service_factory
from .models import RoleGroupModel
from .schemas import CreateRoleGroupSchema, ReadRoleGroupSchema, UpdateRoleGroupSchema

router = APIRouter(prefix="/roles_group", tags=["role_group"])


@router.get(
    "/{role_group_id}",
)
async def get_role_group(
    role_group_id: int, role_group_service: role_group_service_factory
) -> ReadRoleGroupSchema:
    return ReadRoleGroupSchema.model_validate(
        await role_group_service.get_one_by_field(role_group_id)
    )


@router.post("/")
async def create_role_group(
    role_group: Annotated[CreateRoleGroupSchema, Body()],
    role_group_service: role_group_service_factory,
) -> ReadRoleGroupSchema:
    role_group_db = RoleGroupModel(title=role_group.title, group_id=role_group.group_id)
    new_role_group = await role_group_service.create(role_group_db)

    return ReadRoleGroupSchema.model_validate(new_role_group)


@router.patch("/{role_group_id}")
async def update_role_group(
    role_group_id: int,
    role_group: Annotated[UpdateRoleGroupSchema, Body()],
    role_group_service: role_group_service_factory,
):
    await role_group_service.update(
        role_group.model_dump(exclude_none=True), id=role_group_id
    )

    return JSONResponse(status_code=200, content={"message": "Group updated"})


@router.delete("/{role_group_id}")
async def delete_role_group(
    role_group_id: int,
    role_group_service: role_group_service_factory,
):
    await role_group_service.delete(role_group_id)

    return JSONResponse(status_code=200, content={"message": "Group deleted"})
