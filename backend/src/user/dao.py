from src.db.dao_base import DAOBase

from .models import UserModel


class UserDAO(DAOBase):
    model = UserModel

    # async def get_ids_group_and_pesonal_chat(
    # self,
    # session: AsyncSession,
    # user_id: int
    # ):
    #     return await session.execute(
    #         select(
    #             UserModel.id, UserModel.group_id, UserModel.personal_chat_id
    #         ).filter_by(id=user_id)
    #     )
