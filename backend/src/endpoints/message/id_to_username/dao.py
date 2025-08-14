from typing import Protocol

from beanie import PydanticObjectId

from src.core.abstract.dao import DaoProtocol, MongoDaoImpl
from src.endpoints.message.id_to_username.schemas import (
    CreateIdToUsernameModelSchema,
    ReadIdToUsernameModelSchema,
    UpdateIdToUsernameModelSchema,
)

from .models import IdToUsernameModel


class IdToUsernameModelProtocol(
    DaoProtocol[
        PydanticObjectId,
        IdToUsernameModel,
        ReadIdToUsernameModelSchema,
        CreateIdToUsernameModelSchema,
        UpdateIdToUsernameModelSchema,
    ],
    Protocol,
):
    pass


class IdToUsernameModelDao(
    MongoDaoImpl[
        PydanticObjectId,
        IdToUsernameModel,
        ReadIdToUsernameModelSchema,
        CreateIdToUsernameModelSchema,
        UpdateIdToUsernameModelSchema,
    ]
):
    pass
