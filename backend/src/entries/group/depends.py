from typing import Annotated

from fastapi import Depends, Query

from config import settings
from src.entries.group.group.schemas import GroupTypes
from src.entries.group.personal_group.depends import PersonalGroupDaoDep
from src.entries.group.schemas import InvitationTokenSchema
from src.entries.group.simple_group.depends import SimpleGroupServiceDep
from src.entries.group.simple_group.service import SimpleGroupService
from src.security.jwt import JWTManager


def get_jwt_manager_invitation() -> JWTManager[InvitationTokenSchema]:
    return JWTManager(
        settings.secrets.INVITE_TOKEN, InvitationTokenSchema, "HS256", 60 * 24
    )


JwtManagerInvitationDep = Annotated[
    JWTManager[InvitationTokenSchema], Depends(get_jwt_manager_invitation)
]


def get_auto_group_dep(
    group_type: Annotated[GroupTypes, Query()],
    simple_group_service: SimpleGroupServiceDep,
    personal_group_service: PersonalGroupDaoDep,
):
    if group_type == "simple_group":
        return simple_group_service
    elif group_type == "personal_group":
        return personal_group_service


AutoGroupDep = Annotated[
    SimpleGroupService | PersonalGroupDaoDep, Depends(get_auto_group_dep)
]

__all__ = ["JwtManagerInvitationDep", "AutoGroupDep"]
