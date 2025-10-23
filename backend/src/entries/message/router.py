from datetime import datetime
from uuid import UUID

from fastapi import APIRouter

from src.entries.auth.depends import CurrentUserDep
from src.entries.message.depends import MessageServiceDep
from src.entries.message.schemas import (
    CreateMessageNoUserSchema,
    CreateMessageSchema,
    ReadMessageCursorPaginatedSchema,
)

router = APIRouter(prefix="/messages", tags=["messages"])


@router.post("/")
async def create_message(
    obj: CreateMessageNoUserSchema, service: MessageServiceDep, user: CurrentUserDep
):
    return await service.create(
        CreateMessageSchema(
            message=obj.message, user_id=user.id, to_group_id=obj.to_group_id
        )
    )


@router.get("/{group_id}")
async def get_cursor_messages_by_group(
    service: MessageServiceDep,
    group_id: UUID,
    limit: int = 15,
    cursor: datetime | None = None,
) -> ReadMessageCursorPaginatedSchema:
    return await service.get_cursor_messages_by_group(group_id, limit, cursor)


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
# ) -> ReadMessageCursorPaginatedSchema:
#     chat_db = await chat_service.get(chat_id)

#     await group_perm.check_user_in_group(user.id, chat_db.group_id)

#     raw_messages = await message_service.get_cursor_messages_by_group(
#         chat_id, amount, page, skip
#     )

#     messages: list[ReadMessageSchema] = []
#     for message in raw_messages:
#         message = ReadMessageSchema.model_validate(message)

#         try:
#             username_db = await id_user_dao.get(message.user_id)
#         except ModelNotFoundException:
#             username_db = await id_user_dao.create(
#                 CreateIdToUsernameModelSchema(id=message.user_id, username=user.name)
#             )

#         message.author = username_db.username
#         messages.append(message)

#     return ReadMessageCursorPaginatedSchema(messages=messages, page=page, next_page=page + 1)
