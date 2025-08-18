from typing import Annotated

from fastapi import Depends, Request

from config import settings
from src.entries.auth.refresh_token.depends import RefreshTokenDaoDep
from src.entries.auth.schemas import AccessTokenJWTSchema, VerificationTokenJWTSchema
from src.entries.auth.service import AuthService
from src.entries.auth.user.depends import UserDaoDep
from src.entries.auth.user.models import UserModel
from src.infrastructure.smtp.depends import SmtpDep
from src.security.jwt import JWTManager
from src.security.password_helper import PasswordHelperDep
from src.utils.depends import Oauth2SchemeDep


def get_jwt_manager_access() -> JWTManager[AccessTokenJWTSchema]:
    return JWTManager(
        settings.JWT_ACCESS_TOKEN_SECRET_KEY,
        AccessTokenJWTSchema,
        settings.JWT_ALGORITHM,
        settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES,
    )


JwtManagerAccess = Annotated[
    JWTManager[AccessTokenJWTSchema], Depends(get_jwt_manager_access)
]


def get_jwt_manager_verification() -> JWTManager[VerificationTokenJWTSchema]:
    return JWTManager(
        settings.JWT_ACCESS_TOKEN_SECRET_KEY,
        VerificationTokenJWTSchema,
        settings.JWT_ALGORITHM,
        5,
    )


JwtManagerVerification = Annotated[
    JWTManager[VerificationTokenJWTSchema], Depends(get_jwt_manager_verification)
]


def get_auth_service(
    jwt_manager_access: JwtManagerAccess,
    jwt_manager_verification: JwtManagerVerification,
    user_dao: UserDaoDep,
    refresh_token_dao: RefreshTokenDaoDep,
    hasher: PasswordHelperDep,
    smtp: SmtpDep,
) -> AuthService:
    return AuthService(
        jwt_manager_access,
        jwt_manager_verification,
        user_dao,
        refresh_token_dao,
        hasher,
        smtp,
    )


AuthServiceDep = Annotated[AuthService, Depends(get_auth_service)]


def get_refresh_token(request: Request) -> str:
    return request.cookies["refresh_token"]


RefreshTokenDep = Annotated[str, Depends(get_refresh_token)]

AccessTokenDep = Annotated[str, Depends(Oauth2SchemeDep)]


async def get_current_user_from_access(
    access_token: AccessTokenDep, auth: AuthServiceDep
):
    return await auth.get_user_from_access(access_token)


CurrentUserDep = Annotated[UserModel, Depends(get_current_user_from_access)]


async def get_current_user_from_refresh(
    refresh_token: RefreshTokenDep, auth: AuthServiceDep
):
    return await auth.get_current_user_from_refresh(refresh_token)


CurrentUserRefresh = Annotated[UserModel, Depends(get_current_user_from_refresh)]


__all__ = [
    "CurrentUserRefresh",
    "CurrentUserDep",
    "get_current_user_from_access",
    "JwtManagerAccess",
]
