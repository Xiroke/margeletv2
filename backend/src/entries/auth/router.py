from typing import Annotated

from fastapi import Body, Response
from fastapi.routing import APIRouter
from pydantic import EmailStr

from config import settings
from src.entries.auth.depends import AuthServiceDep, CurrentUserDep, RefreshTokenDep
from src.entries.auth.schemas import ReadAccessTokenSchema
from src.entries.auth.user.schemas import CreateUserSchema, LoginUserSchema

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login")
async def login(
    data: LoginUserSchema,
    auth: AuthServiceDep,
    response: Response,
):
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
    return None, 201


@router.post("/register")
async def register(data: CreateUserSchema, auth: AuthServiceDep):
    """Create user and send verification token"""
    await auth.register(data)
    return "The token has been sent to your email", 201


@router.post("/resend_verification")
async def resend_verification(
    email: Annotated[EmailStr, Body()],
    auth: AuthServiceDep,
):
    """Resends the verification token"""
    await auth.resend_verification(email)
    return None, 200


@router.post("/verify")
async def verify(verification_token: Annotated[str, Body()], auth: AuthServiceDep):
    """Verifies the user"""
    await auth.verify(verification_token)
    return None, 200


@router.post("/token")
async def get_access_token(
    refresh_token: RefreshTokenDep, auth: AuthServiceDep
) -> ReadAccessTokenSchema:
    return await auth.get_access_from_refresh(refresh_token)


@router.get("/me")
async def get_me(user: CurrentUserDep):
    """Get current user information"""
    return user
