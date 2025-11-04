import logging
from functools import wraps
from typing import Type

from fastapi import HTTPException

log = logging.getLogger(__name__)


def log_exception[T](cls: Type[T]) -> Type[T]:
    """
    Декоратор для классов исключений - логирует при создании экземпляра
    """
    original_init = cls.__init__

    @wraps(original_init)
    def new_init(self, *args, **kwargs):
        # Логируем перед созданием исключения
        log.debug(
            f"Exception raised: {cls.__name__}: {args[0] if args else 'No message'}"
        )
        original_init(self, *args, **kwargs)

    cls.__init__ = new_init
    return cls


class ServiceNotFoundException(Exception):
    message = "File not found"


class NotFoundException(Exception):
    message = "Not found"


class ServerException(Exception):
    message = "Server error"


class FieldIsNoneException(Exception):
    message = "Field is None"


class NotFoundModelException(Exception):
    """raise when the resulting model object is none"""

    message = "Model not found"


class HTTPPermissionDeniedException(HTTPException):
    def __init__(self, status_code=403, detail="Permission denied", headers=None):
        super().__init__(status_code, detail, headers)


class HTTPAuthenticationException(HTTPException):
    def __init__(self, status_code=401, detail="Authentication error", headers=None):
        super().__init__(status_code, detail, headers)


class HTTPAuthenticationBannedException(HTTPException):
    def __init__(self, status_code=401, detail="Account blocked", headers=None):
        super().__init__(status_code, detail, headers)


@log_exception
class HTTPAuthenticationNotVerifiedException(HTTPException):
    def __init__(self, status_code=401, detail="Account not verified", headers=None):
        super().__init__(status_code, detail, headers)


class ModelNotFoundException(Exception):
    message = "Model not found"


class UniqueViolationError(Exception):
    def __init__(self, message: str):
        self.message = message
