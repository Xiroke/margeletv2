from fastapi import HTTPException


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


class ModelNotFoundException(Exception):
    message = "Model not found"


class UniqueViolationError(Exception):
    def __init__(self, message: str):
        self.message = message
