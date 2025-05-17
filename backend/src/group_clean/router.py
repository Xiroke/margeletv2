import logging

from fastapi import APIRouter

from src.group.schemas import ReadGroupSchema

from .depends import group_service_factory

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/group_clean", tags=["group_clean"])


@router.get("/")
async def get_one_or_none_by_field(
    group: group_service_factory,
) -> list[ReadGroupSchema]:
    result = await group.get_all()
    return [ReadGroupSchema.model_validate(group) for group in result]
