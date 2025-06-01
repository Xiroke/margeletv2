from typing import Annotated

from fastapi import Depends

from .dao import IdToUsernameModelDao


def get_id_to_username_dao() -> IdToUsernameModelDao:
    return IdToUsernameModelDao()


id_to_username_dao = Annotated[IdToUsernameModelDao, Depends(get_id_to_username_dao)]

__all__ = ["id_to_username_dao"]
