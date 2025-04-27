from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Body, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.database import get_async_session

from .dao import PersonalChatDAO
from .models import PersonalChatModel
from .schemas import (
    CreatePersonalChatSchema,
    ReadPersonalChatSchema,
    UpdatePersonalChatSchema,
)

router = APIRouter(prefix="/personal_chats", tags=["personal_chat"])


@router.get(
    "/{personal_chat_uuid}",
)
async def get_personal_chat(
    personal_chat_uuid: UUID,
    session: Annotated[AsyncSession, Depends(get_async_session)],
) -> ReadPersonalChatSchema:
    return await PersonalChatDAO.get_one_by_field(session, id=personal_chat_uuid)


@router.post("/")
async def create_personal_chat(
    personal_chat: Annotated[CreatePersonalChatSchema, Body()],
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    personal_chat_db = PersonalChatModel(title=personal_chat.title)
    new_personal_chat = await PersonalChatDAO.create(session, personal_chat_db)

    return new_personal_chat


@router.patch("/{personal_chat_uuid}")
async def update_personal_chat(
    personal_chat_uuid: UUID,
    personal_chat: Annotated[UpdatePersonalChatSchema, Body()],
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    await PersonalChatDAO.update(
        session, personal_chat.model_dump(exclude_none=True), id=personal_chat_uuid
    )

    return JSONResponse(status_code=200, content={"message": "Personal chat updated"})


@router.delete("/{personal_chat_uuid}")
async def delete_personal_chat(
    personal_chat_uuid: UUID,
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    await PersonalChatDAO.delete(session, personal_chat_uuid)

    return JSONResponse(status_code=200, content={"message": "Personal chat deleted"})
