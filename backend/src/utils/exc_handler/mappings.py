from sqlalchemy.exc import NoResultFound

from .core import ErrorMapping

MapNoResultFound = ErrorMapping(
    exception=NoResultFound, status_code=404, detail="No result found"
)
