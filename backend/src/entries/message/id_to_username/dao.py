from typing import Protocol
from uuid import UUID

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
        UUID,
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
        UUID,
        ReadIdToUsernameModelSchema,
        CreateIdToUsernameModelSchema,
        UpdateIdToUsernameModelSchema,
    ]
):
    pass
