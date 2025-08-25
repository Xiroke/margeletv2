from typing import Any

from fastapi import APIRouter
from pydantic import BaseModel


def router_crud(
    router: APIRouter,
    create_schema: BaseModel,
    read_schema: BaseModel,
    update_schema: BaseModel,
):
    @router.get("/{id}")
    async def get(id: Any):
        return read_schema.model_validate
