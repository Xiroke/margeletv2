from .core import ErrorMapping
from sqlalchemy.exc import NoResultFound

MapNoResultFound = ErrorMapping(
    exception=NoResultFound, status_code=404, detail="No result found"
)
