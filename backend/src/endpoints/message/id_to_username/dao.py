from typing import Protocol

from src.core.abstract.dao_base import DaoProtocol, MongoDaoImpl
from src.endpoints.message.id_to_username.schemas import (
    CreateIdToUsernameModelSchema,
    ReadIdToUsernameModelSchema,
    UpdateIdToUsernameModelSchema,
)

from .models import IdToUsernameModel


class IdToUsernameModelProtocol(
    DaoProtocol[
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
        IdToUsernameModel,
        ReadIdToUsernameModelSchema,
        CreateIdToUsernameModelSchema,
        UpdateIdToUsernameModelSchema,
    ]
):
    pass
