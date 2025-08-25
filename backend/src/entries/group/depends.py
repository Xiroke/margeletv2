from typing import Annotated

from fastapi import Depends

from config import settings
from src.entries.group.schemas import InvitationTokenSchema
from src.security.jwt import JWTManager


def get_jwt_manager_invitation() -> JWTManager[InvitationTokenSchema]:
    return JWTManager(
        settings.secrets.INVITE_TOKEN, InvitationTokenSchema, "HS256", 60 * 24
    )


JwtManagerInvitationDep = Annotated[
    JWTManager[InvitationTokenSchema], Depends(get_jwt_manager_invitation)
]


__all__ = ["JwtManagerInvitationDep"]
