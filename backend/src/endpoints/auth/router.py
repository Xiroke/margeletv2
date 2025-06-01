from fastapi.routing import APIRouter

from src.endpoints.auth.depends import current_user, current_user_from_refresh
from src.endpoints.auth.schemas import AccessTokenJWTSchema

from .depends import jwt_manager_access
from .schemas import UserCreate, UserRead, UserUpdate
from .users import auth_backend, fastapi_users

router = APIRouter(prefix="")

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


@router.get("/auth/me", tags=["auth"])
async def authenticated_route(user: current_user_from_refresh):
    return {"message": f"Hello {user.email}!"}


@router.get("/auth/me_alterntive", tags=["auth"])
async def authenticated_route_alterntive(user: current_user):
    return {"message": f"Hello {user.email}!"}


@router.post("/auth/access_token", tags=["auth"])
async def get_access_token(
    jwt: jwt_manager_access,
    user: current_user_from_refresh,
):
    """
    Get and set in cookie access token using refresh token
    """
    token_data = AccessTokenJWTSchema(user_id=str(user.id))

    access_token = jwt.encode(token_data)
    return {"access_token": access_token}
