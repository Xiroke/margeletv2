from typing import Annotated

from fastapi import Depends

from .dao import IdToUsernameModelDao, IdToUsernameModelProtocol


def get_id_to_username_dao():
    return IdToUsernameModelDao()


id_to_username_dao = Annotated[
    IdToUsernameModelProtocol, Depends(get_id_to_username_dao)
]

__all__ = ["id_to_username_dao"]
