from fastapi import APIRouter

router = APIRouter(prefix="/messages", tags=["messages"])


# @router.websocket("/ws")
# async def websocket_endpoint(
#     websocket: WebSocket,
#     access_token: Annotated[str, Query()],
#     message_service: MessageServiceDep,
#     chat_service: chat_service_factory,
#     jwt: JwtManagerAccess,
#     user_dao: UserDaoDep,
#     id_user_dao: IdToUsernameDaoDep,
# ):
#     user = await get_current_user_from_access(access_token, jwt, user_dao)

#     if user is None:
#         raise WebSocketException(401, "Unauthorized")

#     chats = await chat_service.get_chats_by_user(user.id)
#     chats_id = [i.id for i in chats]
#     await connection_manager_users.connect(websocket, user.id, chats_id)
#     try:
#         while True:
#             data_raw = await websocket.receive_json()
#             data = CreateMessageSchema.model_validate(data_raw)
#             data.user_id = user.id
#             await connection_manager_users.broadcast(
#                 user, data, message_service, id_user_dao
#             )

#     except WebSocketDisconnect:
#         await connection_manager_users.disconnect(websocket, user.id, chats_id)


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
# ) -> ReadMessagePaginatedSchema:
#     chat_db = await chat_service.get(chat_id)

#     await group_perm.check_user_in_group(user.id, chat_db.group_id)

#     raw_messages = await message_service.get_messages_by_id_chat(
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

#     return ReadMessagePaginatedSchema(messages=messages, page=page, next_page=page + 1)
