import re

from sqlalchemy.exc import IntegrityError


def get_field_unique_error(e: IntegrityError) -> str:
    """
    gets the name of the field in the sqlalchemy model that is causing the unique error
    """
    line = getattr(e.orig, "args", [None])[0]
    # get name of field
    field = re.search(r"Key \(([^)]+)\)", line)

    if field is None:
        return "unknown"

    return field.group(1)
