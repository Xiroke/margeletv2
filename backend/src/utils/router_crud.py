from typing import Any, Literal

from fastapi import APIRouter
from pydantic import BaseModel

CrudDependencies = Literal["get", "delete", "update", "create"]


def router_crud(
    router: APIRouter,
    create_schema: type[BaseModel],
    update_schema: type[BaseModel],
    service_dep: Any,
    dependencies: dict[CrudDependencies, Any] | None = None,
):
    """Creates basic crud paths, allows you to restrict access through 'dependencies'"""
    if dependencies is None:
        dependencies = {}

    @router.get("/{id}", dependencies=dependencies.get("get", None))
    async def get(id: Any, service: service_dep):
        return service.get(id)

    @router.post("/", dependencies=dependencies.get("create", None))
    async def create(obj: create_schema, service: service_dep):
        return service.create(validated)

    @router.patch("/{id}", dependencies=dependencies.get("update", None))
    async def update(id: Any, obj: update_schema, service: service_dep):
        return service.update(id, validated)

    @router.delete("/{id}", dependencies=dependencies.get("delete", None))
    async def delete(id: Any, service: service_dep):
        return service.delete(id)
