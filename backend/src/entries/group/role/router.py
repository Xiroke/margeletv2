# from typing import Annotated
# from uuid import UUID

from fastapi import APIRouter

# from fastapi.responses import JSONResponse

# from src.core.abstract.permission import perms
# from src.entries.auth.depends import CurrentUserDep

# from .depends import RoleServiceDep
# from .schemas import RoleCreate, RoleRead, RoleUpdate

router = APIRouter(prefix="/roles", tags=["role"])


# @router.get(
#     "/{role_id}",
# )
# async def get_role(role_id: int, role_service: RoleServiceDep) -> RoleRead:
#     return RoleRead.model_validate(await role_service.get(role_id))


# @router.get("/permissions/me/{group_id}")
# async def get_my_permissions_in_group(
#     role_service: RoleServiceDep, user: CurrentUserDep, group_id: UUID
# ):
#     await role_service.get_user_permissions_in_group(user.id, group_id)


# @router.post("/{group_id}", dependencies=perms(["r:can_edit_roles"]))
# async def create_role(
#     group_id: UUID,
#     role: Annotated[RoleCreate, Body()],
#     role_service: RoleServiceDep,
# ) -> RoleRead:
#     new_role = await role_service.create(role)

#     return RoleRead.model_validate(new_role)


# @router.patch("/{role_id}", dependencies=perms(["r:can_edit_roles"]))
# async def update_role(
#     role_id: int,
#     role: Annotated[RoleUpdate, Body()],
#     role_service: RoleServiceDep,
# ):
#     await role_service.update(
#         role_id,
#         RoleUpdate(
#             **role.model_dump(exclude_none=True),
#         ),
#     )

#     return JSONResponse(status_code=200, content={"message": "Group updated"})


# @router.delete("/{role_id}", dependencies=perms(["r:can_edit_roles"]))
# async def delete_role(
#     role_id: int,
#     role_service: RoleServiceDep,
# ):
#     await role_service.delete(role_id)

#     return JSONResponse(status_code=200, content={"message": "Group deleted"})
