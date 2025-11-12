from logging import getLogger

from fastapi import FastAPI, status
from fastapi.responses import JSONResponse
from jwt import DecodeError, ExpiredSignatureError, InvalidTokenError
from sqlalchemy.exc import IntegrityError

from src.utils.exceptions import ModelNotFoundException, UniqueViolationError

log = getLogger(__name__)


def register_exception_handler(app: FastAPI):
    @app.exception_handler(ModelNotFoundException)
    async def model_not_found_exception_handler(request, exc):
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"detail": "Model not found"},
        )

    # JWT exceptions
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

    @app.exception_handler(IntegrityError)
    async def integrity_error_handler(request, exc: IntegrityError):
        if "UniqueViolationError" in str(exc):
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"detail": "Unique error"},
            )

        log.error("Error %s", exc)
        raise

    @app.exception_handler(UniqueViolationError)
    async def unique_error_handler(request, exc):
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"detail": "Unique error"},
        )
