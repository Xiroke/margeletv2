from fastapi import Response
from fastapi.routing import APIRouter

from src.endpoints.access_token.depends import write_access_token
from src.endpoints.role_group.depends import role_group_service_factory
from src.endpoints.user.depends import current_active_user_factory
from src.endpoints.user.router import router as user_router
from src.utils.jwt import user_jwt_manager_factory

from .schemas import UserCreate, UserRead, UserUpdate
from .users import auth_backend, fastapi_users

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
async def authenticated_route(user: current_active_user_factory):
    return {"message": f"Hello {user.email}!"}


# @router.get("/auth/access_token", tags=["auth"])
# async def get_access_token(
#     jwt_strategy: Annotated[JWTStrategy, Depends(get_jwt_strategy)],
#     user: current_active_user_factory,
#     response: Response,
# ):
#     """
#     Get access token using refresh token
#     """
#     access_token = await jwt_strategy.write_token(user)

#     return {"access_token": access_token}


@router.get("/auth/access_token", tags=["auth"])
async def get_access_token(
    user_jwt_manager: user_jwt_manager_factory,
    roles_group_service: role_group_service_factory,
    user: current_active_user_factory,
    response: Response,
):
    """
    Get access token using refresh token
    """
    access_token = await write_access_token(
        response, user.id, user_jwt_manager, roles_group_service
    )
    return {"access_token": access_token}
