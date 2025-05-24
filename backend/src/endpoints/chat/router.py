from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Body
from fastapi.responses import JSONResponse

from src.endpoints.user.depends import current_active_user_factory

from .depends import chat_service_factory
from .models import ChatModel
from .schemas import CreateChatSchema, ReadChatSchema, UpdateChatSchema

router = APIRouter(prefix="/chats", tags=["chat"])


@router.get("/chats/me")
async def get_my_chats(
    current_user: current_active_user_factory, chat_service: chat_service_factory
) -> list[ReadChatSchema]:
    return await chat_service.get_all_chats_by_user(current_user.id)


@router.get("/group_chats/{group_id}")
async def get_group_chats(
    group_id: UUID, chat_service: chat_service_factory
) -> list[ReadChatSchema]:
    return [
        ReadChatSchema.model_validate(chat)
        for chat in await chat_service.get_many_by_field(ChatModel.group_id == group_id)
    ]


@router.get(
    "/{chat_uuid}",
)
async def get_chat(
    chat_uuid: UUID, chat_service: chat_service_factory
) -> ReadChatSchema:
    return ReadChatSchema.model_validate(
        await chat_service.get_one_by_field(ChatModel.id == chat_uuid)
    )


@router.post("/{group_id}")
async def create_chat(
    chat: Annotated[CreateChatSchema, Body()],
    group_id: UUID,
    chat_service: chat_service_factory,
):
    chat_db = ChatModel(title=chat.title, group_id=group_id)
    new_chat = await chat_service.create(chat_db)

    return new_chat


@router.patch("/{chat_uuid}")
async def update_chat(
    chat_uuid: UUID,
    chat: Annotated[UpdateChatSchema, Body()],
    chat_service: chat_service_factory,
):
    await chat_service.update(chat.model_dump(exclude_none=True), id=chat_uuid)

    return JSONResponse(status_code=200, content={"message": "Chat updated"})


@router.delete("/{chat_uuid}")
async def delete_chat(
    chat_uuid: UUID,
    chat_service: chat_service_factory,
):
    await chat_service.delete(chat_uuid)

    return JSONResponse(status_code=200, content={"message": "Chat deleted"})
