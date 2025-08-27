from fastapi import APIRouter

from src.utils.router_crud import router_crud

from .depends import SimpleGroupServiceDep
from .schemas import CreateSimpleGroupSchema, UpdateSimpleGroupSchema

router = APIRouter(prefix="/simple_groups", tags=["group"])

router_crud(
    router, CreateSimpleGroupSchema, UpdateSimpleGroupSchema, SimpleGroupServiceDep
)
