from uuid import UUID

from fastapi import APIRouter

from src.entries.auth.depends import CurrentUserDep
from src.entries.group.personal_group.depends import PersonalGroupServiceDep
from src.utils.router_crud import router_crud

from .schemas import CreatePersonalGroupSchema, UpdatePersonalGroupSchema

router = APIRouter(prefix="/personal_groups", tags=["personal_groups"])


@router.post("/{other_user_id}")
async def create(
    user: CurrentUserDep,
    other_user_id: UUID,
    service: PersonalGroupServiceDep,
):
    """Creates a personal group between the current user and another"""
    return await service.create(CreatePersonalGroupSchema(), user.id, other_user_id)


router_crud(
    router,
    PersonalGroupServiceDep,
    UUID,
    CreatePersonalGroupSchema,
    UpdatePersonalGroupSchema,
    excepted_router=["create", "get", "delete"],
)
