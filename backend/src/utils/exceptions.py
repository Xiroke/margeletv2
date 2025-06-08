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


class PermissionNotHasAttributeException(Exception):
    """raise when the required field is not found in the model"""

    message = "Permission no has data"


class PermissionGroupDeniedException(Exception):
    """raise when user does not have permission setted in group"""

    message = "Permission group denied"


class ModelNotFoundException(Exception):
    message = "Model not found"


class UniqueViolationException(Exception):
    def __init__(self, message: str):
        self.message = message
