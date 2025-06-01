from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Body
from fastapi.responses import JSONResponse

from src.endpoints.auth.depends import current_user
from src.endpoints.group.permissions import group_permission
from src.endpoints.role.models import RolePermissionsEnum
from src.endpoints.role.permissions import role_permission

from .depends import chat_service_factory
from .schemas import CreateChatSchema, ReadChatSchema, UpdateChatSchema

router = APIRouter(prefix="/chats", tags=["chat"])


@router.get("/group_chats/{group_id}")
async def get_group_chats(
    group_id: UUID,
    chat_service: chat_service_factory,
    group_perm: group_permission,
    user: current_user,
) -> list[ReadChatSchema]:
    await group_perm.check_user_in_group(user.id, group_id)

    return [
        ReadChatSchema.model_validate(chat)
        for chat in await chat_service.get_chats_by_group(group_id)
    ]


@router.post("/{group_id}")
async def create_chat(
    group_id: UUID,
    chat: Annotated[CreateChatSchema, Body()],
    chat_service: chat_service_factory,
):
    return await chat_service.create(
        CreateChatSchema(group_id=group_id, **chat.model_dump(exclude_unset=True))
    )


@router.patch("/{chat_id}")
async def update_chat(
    chat_id: UUID,
    chat: Annotated[UpdateChatSchema, Body()],
    chat_service: chat_service_factory,
    role_perm: role_permission,
    user: current_user,
):
    chat_db = await chat_service.get_one_by_id(chat_id)

    await role_perm.check_user_has_permission(
        RolePermissionsEnum.CAN_CONTROL_CHATS, user.id, chat_db.group_id
    )
    await chat_service.update(UpdateChatSchema(id=chat_id, **chat.model_dump()))

    return JSONResponse(status_code=200, content={"message": "Chat updated"})


@router.delete("/{chat_id}")
async def delete_chat(
    chat_id: UUID,
    chat_service: chat_service_factory,
    role_perm: role_permission,
    user: current_user,
):
    chat_db = await chat_service.get_one_by_id(chat_id)

    await role_perm.check_user_has_permission(
        RolePermissionsEnum.CAN_CONTROL_CHATS, user.id, chat_db.group_id
    )
    await chat_service.delete(chat_id)

    return JSONResponse(status_code=200, content={"message": "Chat deleted"})
