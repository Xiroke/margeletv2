from typing import Annotated, AsyncGenerator
from datetime import datetime, timedelta, timezone

from fastapi import Depends, HTTPException, Response
from fastapi.routing import APIRouter
from fastapi_users.authentication import JWTStrategy
from fastapi_users_db_sqlalchemy.access_token import (
    SQLAlchemyAccessTokenDatabase,
)
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.models import UserModel
from src.user.router import router as user_router
from src.db.database import get_async_session
from src.token.dao import get_refresh_token_db
from src.token.models import TokenModel
from .utils import get_token_from_cookie
from .schemas import UserCreate, UserRead, UserUpdate, AccessToken
from .users import (
    auth_backend,
    current_active_user,
    fastapi_users,
    get_jwt_strategy,
)

router = APIRouter(prefix="")

router.include_router(user_router)
router.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"]
)
router.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)
router.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)
router.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
    tags=["auth"],
)
router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)


@router.get("/authenticated-route")
async def authenticated_route(user: Annotated[UserModel, Depends(current_active_user)]):
    return {"message": f"Hello {user.email}!"}


@router.get("/auth/access_token", tags=["auth"])
async def get_access_token(
    session: Annotated[AsyncSession, Depends(get_async_session)],
    jwt_strategy: Annotated[JWTStrategy, Depends(get_jwt_strategy)],
    user: Annotated[UserModel, Depends(current_active_user)],
    response: Response,
):
    """
    Get access token using refresh token
    """
    access_token = await jwt_strategy.write_token(user)

    response.set_cookie(
        key="access_token",
        value=access_token,
        expires=datetime.now(timezone.utc) + timedelta(days=1),
        httponly=True,
        secure=True,
        samesite="none",
    )

    return {"access_token": access_token}
