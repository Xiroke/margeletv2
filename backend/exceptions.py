from fastapi import FastAPI, status
from fastapi.responses import JSONResponse
from jwt import DecodeError, ExpiredSignatureError, InvalidTokenError

from src.utils.exeptions import PermissionGroupDeniedError


def exception_handler(app: FastAPI):
    @app.exception_handler(ExpiredSignatureError)
    async def jwt_expired_token_handler(request, exc):
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={"detail": "Token expired"},
        )

    @app.exception_handler(InvalidTokenError)
    async def jwt_invalid_token_handler(request, exc):
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={"detail": "Invalid token"},
        )

    @app.exception_handler(DecodeError)
    async def http_exception_handler(request, exc):
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={"detail": "Invalid token"},
        )

    @app.exception_handler(PermissionGroupDeniedError)
    async def permission_denied_handler(request, exc):
        return JSONResponse(
            status_code=status.HTTP_403_FORBIDDEN,
            content={"detail": "Permission denied"},
        )
