from typing import Protocol, cast
from uuid import UUID

from sqlalchemy import select, update

from src.core.abstract.dao import DaoProtocol, SqlDaoImpl
from src.entries.auth.refresh_token.models import RefreshTokenModel
from src.entries.auth.user.models import UserModel
from src.entries.auth.user.schemas import UserCreate, UserRead, UserUpdate
from src.utils.exceptions import ModelNotFoundException


class UserDaoProtocol(
    DaoProtocol[
        UserModel,
        UUID,
        UserRead,
        UserCreate,
        UserUpdate,
    ],
    Protocol,
):
    async def get_user_by_email(self, email: str) -> UserRead: ...
    async def get_user_by_account_name(self, account_name: str) -> UserRead: ...
    async def get_user_for_check_password(self, email: str) -> UserModel: ...
    async def get_user_by_token(self, token: str) -> UserRead: ...
    async def set_is_verified(self, user_id: UUID, value: bool): ...
    async def set_is_active(self, user_id: UUID, value: bool): ...
    async def get_usernames_by_id(self, user_ids: list[UUID]) -> dict[str, str]: ...


class UserSqlDao(
    SqlDaoImpl[
        UserModel,
        UUID,
        UserRead,
        UserCreate,
        UserUpdate,
    ]
):
    async def get_user_by_email(self, email: str) -> UserRead:
        return await self.get(email=email)

    async def get_user_by_account_name(self, account_name: str) -> UserRead:
        return await self.get(account_name=account_name)

    async def get_user_for_check_password(self, email: str) -> UserModel:
        smtp = select(self.model_type).filter_by(email=email)

        result = await self.session.execute(smtp)

        record = result.scalar_one_or_none()

        if record is None:
            raise ModelNotFoundException(self.model_type.__name__, str(id))

        return cast(UserModel, record)

    async def get_user_by_token(self, token: str) -> UserRead:
        smtp = (
            select(self.model_type)
            .join(RefreshTokenModel, RefreshTokenModel.user_id == self.model_type.id)
            .filter(RefreshTokenModel.value == token)
        )

        return await self._execute_and_return_one(smtp)

    async def set_is_verified(self, user_id: UUID, value: bool):
        smtp = update(self.model_type).filter_by(id=user_id).values(is_verified=value)
        await self.session.execute(smtp)

        await self.update({"id": user_id}, UserUpdate(is_verified=value))

    async def set_is_active(self, user_id: UUID, value: bool):
        smtp = update(self.model_type).filter_by(id=user_id).values(is_active=value)
        await self.session.execute(smtp)

    async def get_usernames_by_id(self, user_ids: list[UUID]) -> dict[str, str]:
        smtp = select(UserModel.id, UserModel.name).filter(UserModel.id.in_(user_ids))
        result = await self.session.execute(smtp)

        return {str(row.id): row.name for row in result.all()}
