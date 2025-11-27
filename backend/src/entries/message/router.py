from datetime import datetime
from uuid import UUID

from beanie import PydanticObjectId
from fastapi import APIRouter

from src.entries.auth.depends import CurrentUserDep
from src.entries.message.depends import MessageServiceDep
from src.entries.message.schemas import (
    MessageCreate,
    MessageCursorPaginatedRead,
    MessageInternalCreate,
    MessageRead,
    MessageUpdate,
)

router = APIRouter(prefix="/messages", tags=["messages"])


@router.post("/")
async def create_message(
    obj: MessageCreate, service: MessageServiceDep, user: CurrentUserDep
):
    return await service.create(
        MessageInternalCreate(
            message=obj.message, user_id=user.id, to_group_id=obj.to_group_id
        )
    )


@router.get("/cursor/{group_id}")
async def get_cursor_messages_by_group(
    service: MessageServiceDep,
    group_id: UUID,
    limit: int = 15,
    cursor: datetime | None = None,
) -> MessageCursorPaginatedRead:
    return await service.get_cursor_messages_by_group(group_id, limit, cursor)


@router.get("/last/{group_id}")
async def get_last_messages_by_group(
    service: MessageServiceDep,
    group_id: UUID,
    limit: int = 15,
) -> list[MessageRead]:
    return await service.get_last_messages_by_group(group_id, limit)


@router.patch("/{message_id}")
async def update_message(
    message_id: PydanticObjectId,
    obj: MessageUpdate,
    service: MessageServiceDep,
):
    return await service.update(obj, id=message_id)


@router.delete("/{message_id}")
async def delete_messages(
    message_id: PydanticObjectId,
    service: MessageServiceDep,
):
    return await service.delete(id=message_id)
