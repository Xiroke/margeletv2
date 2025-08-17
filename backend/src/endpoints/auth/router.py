from fastapi import Response
from fastapi.routing import APIRouter

from config import settings
from src.endpoints.auth.depends import AuthServiceDep, CurrentUserDep, RefreshTokenDep
from src.endpoints.auth.user.schemas import CreateUserSchema, LoginUserSchema

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
async def register(data: CreateUserSchema, auth: AuthServiceDep):
    await auth.register(data)
    return None, 201


@router.post("/token")
async def get_access_token(refresh_token: RefreshTokenDep, auth: AuthServiceDep):
    return await auth.get_access_from_refresh(refresh_token)


@router.get("/me")
async def get_me(user: CurrentUserDep):
    """Get current user information"""
    return user
