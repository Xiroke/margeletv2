from typing import Annotated

from fastapi import Depends, HTTPException
from fastapi.routing import APIRouter
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.models import UserModel
from src.user.router import router as user_router
from .utils import get_token_from_cookie
from src.token.dao import TokenDAO
from src.db.database import get_async_session
from .schemas import UserCreate, UserRead, UserUpdate
from .users import (
    auth_backend,
    current_active_user,
    fastapi_users,
    get_jwt_strategy,
    get_user_db,
    get_user_manager,
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


@router.post("/auth/access_token", tags=["auth"])
async def get_access_token(
    session: Annotated[AsyncSession, Depends(get_async_session)],
    token: Annotated[str, Depends(get_token_from_cookie)],
):
    """
    Get refresh token from cookie and return access token
    """
    refresh_token_db = await TokenDAO.get_one_or_none_by_field(session, value=token)

    if refresh_token_db is None:
        raise HTTPException(status_code=401, detail="Invalid token")

    jwt_strategy = get_jwt_strategy()

    user = await jwt_strategy.read_token(
        refresh_token_db.value,
        user_manager=await anext(get_user_manager(await anext(get_user_db(session)))),
    )

    print(refresh_token_db.value)
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid token")

    access_token = await jwt_strategy.write_token(user)
    return {"access_token": access_token, "token_type": "bearer"}
