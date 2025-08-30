from typing import Annotated, Any, Literal

from fastapi import APIRouter, Path

from src.core.types import CreateSchemaType, IDType, UpdateSchemaType

CrudDependencies = Literal["get", "delete", "update", "create"]


def router_crud(
    router: APIRouter,
    service_dep: Any,
    id_type: type[IDType],
    create_schema: type[CreateSchemaType],
    update_schema: type[UpdateSchemaType],
    dependencies: dict[CrudDependencies, Any] = dict(),
    excepted_router: list[CrudDependencies] = list(),
):
    """Creates basic crud paths, allows you to restrict access through 'dependencies'"""

    if "get" not in excepted_router:

        @router.get("/{id}", dependencies=dependencies.get("get", None))
        async def get(id: Annotated[id_type, Path()], service: service_dep):
            return service.get(id)

    if "create" not in excepted_router:

        @router.post("/", dependencies=dependencies.get("create", None))
        async def create(obj: create_schema, service: service_dep):
            return service.create(obj)

    if "update" not in excepted_router:

        @router.patch("/{id}", dependencies=dependencies.get("update", None))
        async def update(
            id: Annotated[id_type, Path()], obj: update_schema, service: service_dep
        ):
            return service.update(id, obj)

    if "delete" not in excepted_router:

        @router.delete("/{id}", dependencies=dependencies.get("delete", None))
        async def delete(id: Annotated[id_type, Path()], service: service_dep):
            return service.delete(id)
