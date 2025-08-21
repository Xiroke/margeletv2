from typing import Protocol, override
from uuid import UUID

from sqlalchemy import and_, delete, insert, select

from src.core.abstract.dao import DaoProtocol, SqlDaoImpl

from .models import GroupModel, PersonalGroupModel, SimpleGroupModel, UserToGroupModel
from .schemas import (
    CreateGroupSchema,
    GroupModelMixins,
    GroupTypeEnum,
    PersonalGroupSchema,
    ReadGroupSchema,
    SimpleGroupSchema,
    UpdateGroupSchema,
)


class GroupDaoProtocol(
    DaoProtocol[
        GroupModel, UUID, ReadGroupSchema, CreateGroupSchema, UpdateGroupSchema
    ],
    Protocol,
):
    async def create(
        self, obj: CreateGroupSchema, user_id: UUID
    ) -> ReadGroupSchema: ...
    async def is_user_in_group(self, group_id: UUID, user_id: UUID) -> bool: ...
    async def add_user_to_group(self, group_id: UUID, user_id: UUID) -> None: ...
    async def remove_user_from_group(self, group_id: UUID, user_id: UUID) -> None: ...
    async def get_groups_by_user(self, user_id: UUID) -> list[ReadGroupSchema]: ...
    async def add_role_to_user(self, user_id: UUID, role_id: UUID) -> None: ...


class GroupSqlDao(
    SqlDaoImpl[GroupModel, UUID, ReadGroupSchema, CreateGroupSchema, UpdateGroupSchema],
):
    @override
    async def create(
        self, obj: CreateGroupSchema, inheritor: GroupModelMixins, user_id: UUID
    ):
        # obj: GroupModel = GroupModel(**obj.model_dump())
        # self.session.add(obj)
        # await self.session.flush()
        # await self.session.execute(
        #     insert(UserToGroupModel).values(group_id=obj.id, user_id=user_id)
        # )
        # await self.session.flush()
        # await self.session.refresh(obj)

        if obj.type == GroupTypeEnum.SIMPLE_GROUP:
            group = SimpleGroupModel(**obj.model_dump())
            self.session.add(group)
            await self.session.flush()
            await self.session.execute(
                insert(UserToGroupModel).values(group_id=group.id, user_id=user_id)
            )
            await self.session.flush()
            await self.session.refresh(group)
            return SimpleGroupSchema.model_validate(group)

        elif obj.type == GroupTypeEnum.PERSONAL_GROUP:
            group = PersonalGroupModel(**obj.model_dump())
            self.session.add(group)
            await self.session.flush()
            await self.session.execute(
                insert(UserToGroupModel).values(group_id=group.id, user_id=user_id)
            )
            await self.session.flush()
            await self.session.refresh(group)
            return PersonalGroupSchema.model_validate(group)

    async def is_user_in_group(self, group_id: UUID, user_id: UUID) -> bool:
        result = await self.session.execute(
            select(UserToGroupModel)
            .filter(UserToGroupModel.user_id == user_id)
            .filter(UserToGroupModel.group_id == group_id)
        )
        return result.scalar_one_or_none() is not None

    async def add_user_to_group(self, group_id: UUID, user_id: UUID) -> None:
        await self.session.execute(
            insert(UserToGroupModel).values(group_id=group_id, user_id=user_id)
        )
        await self.session.flush()

    async def remove_user_from_group(self, group_id: UUID, user_id: UUID) -> None:
        await self.session.execute(
            delete(UserToGroupModel).filter(
                and_(
                    UserToGroupModel.user_id == user_id,
                    UserToGroupModel.group_id == group_id,
                )
            )
        )
        await self.session.flush()

    async def get_groups_by_user(self, user_id: UUID) -> list[ReadGroupSchema]:
        result = await self.session.execute(
            select(GroupModel).join(
                UserToGroupModel,
                and_(
                    UserToGroupModel.user_id == user_id,
                    UserToGroupModel.group_id == GroupModel.id,
                ),
            )
        )
        return [ReadGroupSchema.model_validate(i) for i in result.scalars().all()]

    # async def add_role_to_user(self, user_id: UUID, role_id: UUID) -> None:
    #     await self.session.execute(
    #         insert(UserToRoleModel).values(user_id=user_id, role_id=role_id)
    #     )
    #     await self.session.flush()


class SimpleGroupDao(
    SqlDaoImpl[
        SimpleGroupModel, UUID, SimpleGroupSchema, CreateGroupSchema, UpdateGroupSchema
    ]
):
    pass


class PersonalGroupDao(
    SqlDaoImpl[
        PersonalGroupModel,
        UUID,
        PersonalGroupSchema,
        CreateGroupSchema,
        UpdateGroupSchema,
    ]
):
    pass


# class SubChatDao(
#     SqlDaoImpl[
#         SubChatModel, UUID, SubChatGroupSchema, CreateGroupSchema, UpdateGroupSchema
#     ]
# ):
#     pass

#     async def create_subchat(
#         self, obj: CreateGroupSchema, multi_group_id: UUID, user_id: UUID
#     ) -> SubChatGroupSchema:
#         # Сначала создаем базовую группу
#         group_data = obj.model_dump()
#         group = GroupModel(**group_data)
#         self.session.add(group)
#         await self.session.flush()

#         # Создаем подчат
#         subchat = SubChatModel(id=group.id, multi_group_id=multi_group_id)
#         self.session.add(subchat)

#         # Добавляем пользователя
#         user_group = UserToGroupModel(user_id=user_id, group_id=group.id)
#         self.session.add(user_group)

#         await self.session.commit()
#         await self.session.refresh(subchat)

#         return self.read_schema_type.model_validate(subchat)


# class MultiGroupDao(
#     SqlDaoImpl[
#         MultiGroupModel, UUID, MultiGroupSchema, CreateGroupSchema, UpdateGroupSchema
#     ]
# ):
#     pass

#     async def get_with_chats(self, group_id: UUID) -> MultiGroupSchema:
#         stmt = select(MultiGroupModel).where(MultiGroupModel.id == group_id)
#         result = await self.session.execute(stmt)
#         multi_group = result.scalar_one_or_none()

#         if multi_group is None:
#             raise ModelNotFoundException(self.model_type.__name__, id)


#         return MultiGroupSchema.model_validate(multi_group)
