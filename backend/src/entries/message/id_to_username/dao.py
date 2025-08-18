from typing import Protocol

from beanie import PydanticObjectId

from src.core.abstract.dao import DaoProtocol, MongoDaoImpl
from src.entries.message.id_to_username.schemas import (
    CreateIdToUsernameModelSchema,
    ReadIdToUsernameModelSchema,
    UpdateIdToUsernameModelSchema,
)

from .models import IdToUsernameModel


class IdToUsernameModelProtocol(
    DaoProtocol[
        IdToUsernameModel,
        PydanticObjectId,
        ReadIdToUsernameModelSchema,
        CreateIdToUsernameModelSchema,
        UpdateIdToUsernameModelSchema,
    ],
    Protocol,
):
    pass


class IdToUsernameModelDao(
    MongoDaoImpl[
        IdToUsernameModel,
        PydanticObjectId,
        ReadIdToUsernameModelSchema,
        CreateIdToUsernameModelSchema,
        UpdateIdToUsernameModelSchema,
    ]
):
    pass
