from fastapi import Response
from fastapi.routing import APIRouter

from config import settings
from src.endpoints.auth.depends import (
    AccessTokenDep,
    AuthServiceDep,
    CurrentUserDep,
    RefreshTokenDep,
)
from src.endpoints.auth.user.depends import UserDaoDep
from src.endpoints.auth.user.schemas import LoginUserSchema

from .schemas import UserCreate

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login")
async def login(
    data: LoginUserSchema,
    auth: AuthServiceDep,
    response: Response,
) -> None:
    refresh_token = await auth.login(data)
    response.set_cookie(
        "refresh_token",
        refresh_token.value,
        max_age=60 * 60 * 24 * 30,
        httponly=settings.COOKIE_HTTPONLY,
        samesite=settings.COOKIE_SAMESITE,
        secure=settings.COOKIE_SECURE,
        path="/api/auth",
    )


@router.post("/register")
async def register(data: UserCreate, auth: AuthServiceDep):
    await auth.register(data)
    return None, 201


@router.post("/token")
async def get_access_token(refresh_token: RefreshTokenDep, auth: AuthServiceDep):
    return auth.get_access_from_refresh(refresh_token)


@router.get("/is_authificated")
async def check_is_authificated(token: AccessTokenDep):
    """Проверка на то что передается access token"""
    return True


@router.get("/is_refresh_valid")
async def check_refresh_token(user_dao: UserDaoDep, refresh_token: RefreshTokenDep):
    """Проверка принадлежит ли этот токен пользователю"""
    await user_dao.get_user_by_token(refresh_token)
    return True


@router.get("/me")
async def get_me(user: CurrentUserDep):
    """Получение информации о текущем пользователе"""
    return user
