from datetime import datetime
from uuid import UUID

from beanie import PydanticObjectId
from fastapi import APIRouter

from src.entries.auth.depends import CurrentUserDep
from src.entries.message.depends import MessageServiceDep
from src.entries.message.schemas import (
    MessageCreate,
    MessageCursorPaginatedRead,
    MessageNoUserCreate,
    MessageRead,
    MessageUpdate,
)
from src.utils.router_crud import router_crud

router = APIRouter(prefix="/messages", tags=["messages"])


@router.post("/")
async def create_message(
    obj: MessageNoUserCreate, service: MessageServiceDep, user: CurrentUserDep
):
    return await service.create(
        MessageCreate(message=obj.message, user_id=user.id, to_group_id=obj.to_group_id)
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


# @router.get("/chat/{chat_id}")
# async def get_messages_in_chat(
#     chat_id: UUID,
#     user: CurrentUserDep,
#     message_service: MessageServiceDep,
#     chat_service: chat_service_factory,
#     id_user_dao: IdToUsernameDaoDep,
#     group_perm: group_permission,
#     amount: Annotated[int, Query(ge=1, lt=100)] = 15,
#     page: Annotated[
#         int,
#         Query(
#             ge=1,
#             description="Page mean how many messages skip it equal amount * (page - 1)",
#         ),
#     ] = 1,
#     skip: Annotated[int, Query(ge=0)] = 0,
# ) -> MessageCursorPaginatedRead:
#     chat_db = await chat_service.get(chat_id)

#     await group_perm.check_user_in_group(user.id, chat_db.group_id)

#     raw_messages = await message_service.get_cursor_messages_by_group(
#         chat_id, amount, page, skip
#     )

#     messages: list[MessageRead] = []
#     for message in raw_messages:
#         message = MessageRead.model_validate(message)

#         try:
#             username_db = await id_user_dao.get(message.user_id)
#         except ModelNotFoundException:
#             username_db = await id_user_dao.create(
#                 IdToUsernameModelCreate(id=message.user_id, username=user.name)
#             )

#         message.author = username_db.username
#         messages.append(message)

#     return MessageCursorPaginatedRead(messages=messages, page=page, next_page=page + 1)

router_crud(
    router,
    MessageServiceDep,
    PydanticObjectId,
    MessageCreate,
    MessageUpdate,
    excepted_router=["get", "create"],
)
