from fastapi import HTTPException, status


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


class PermissionNotHasAttributeError(Exception):
    """raise when the required field is not found in the model"""

    message = "Permission no has data"


class HTTPExpiredSignatureError(HTTPException):
    message = "Token expired"
    status_code = status.HTTP_401_UNAUTHORIZED


class HTTPInvalidTokenError(HTTPException):
    message = "Invalid token"
    status_code = status.HTTP_400_BAD_REQUEST
