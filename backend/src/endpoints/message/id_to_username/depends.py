from typing import Annotated

from fastapi import Depends

from .dao import IdToUsernameDao
from .models import IdToUsername


def get_id_to_username_dao() -> IdToUsernameDao:
    return IdToUsernameDao(IdToUsername)


id_to_username_dao = Annotated[IdToUsernameDao, Depends(get_id_to_username_dao)]

__all__ = ["id_to_username_dao"]
