from uuid import UUID

from fastapi import APIRouter

from src.entries.auth.depends import CurrentUserDep
from src.utils.router_crud import router_crud

from .depends import SimpleGroupServiceDep
from .schemas import SimpleGroupCreate, SimpleGroupRead, SimpleGroupUpdate

router = APIRouter(prefix="/simple_groups", tags=["simple_group"])


@router.post("/")
async def create(
    user: CurrentUserDep,
    obj: SimpleGroupCreate,
    service: SimpleGroupServiceDep,
):
    return await service.create(obj, user.id)


@router.get("/search")
async def search_groups(
    query: str,
    group_service: SimpleGroupServiceDep,
) -> list[SimpleGroupRead]:
    return await group_service.search(query)


router_crud(
    router,
    SimpleGroupServiceDep,
    UUID,
    SimpleGroupCreate,
    SimpleGroupUpdate,
    excepted_router=["get", "delete", "create"],
)
