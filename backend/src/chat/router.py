from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.database import get_async_session
from .models import ChatModel
from .schemas import ReadChatSchema, CreateChatSchema, UpdateChatSchema
from .dao import ChatDAO

router = APIRouter(prefix="/chats", tags=["chat"])


@router.get(
    "/{chat_uuid}",
)
async def get_chat(
    chat_uuid: UUID, session: Annotated[AsyncSession, Depends(get_async_session)]
) -> ReadChatSchema:
    return await ChatDAO.get_one_by_field(session, id=chat_uuid)


@router.post("/")
async def create_chat(
    chat: Annotated[CreateChatSchema, Depends()],
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    chat_db = ChatModel(title=chat.title, group_id=chat.group_id)
    new_chat = await ChatDAO.create(session, chat_db)

    return new_chat


@router.patch("/{chat_uuid}")
async def update_chat(
    chat_uuid: UUID,
    chat: Annotated[UpdateChatSchema, Depends()],
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    await ChatDAO.update(session, chat.model_dump(exclude_none=True), id=chat_uuid)

    return JSONResponse(status_code=200, content={"message": "Group updated"})


@router.delete("/{chat_uuid}")
async def delete_chat(
    chat_uuid: UUID,
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    await ChatDAO.delete(session, chat_uuid)

    return JSONResponse(status_code=200, content={"message": "Group deleted"})
