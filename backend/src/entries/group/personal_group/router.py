from fastapi import APIRouter

from src.entries.group.personal_group.depends import PersonalGroupServiceDep
from src.utils.router_crud import router_crud

from .schemas import CreatePersonalGroupSchema, UpdatePersonalGroupSchema

router = APIRouter(prefix="/personal_groups", tags=["group"])

router_crud(
    router,
    CreatePersonalGroupSchema,
    UpdatePersonalGroupSchema,
    PersonalGroupServiceDep,
)
