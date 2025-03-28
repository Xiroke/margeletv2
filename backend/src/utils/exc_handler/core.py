from typing import List, Callable, Type

from pydantic import BaseModel
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from logging import getLogger

logger = getLogger(__name__)


class ErrorMapping(BaseModel):
    exception: Type[Exception]
    status_code: int
    detail: str


def handle_error(
    mapping_exception: List[ErrorMapping] | None = None,
    log_error: bool = True,
    rollback: bool = False,
):
    """
    Decorator to handle exceptions.
    If an unexpected error occurs,
    we return a 500 status code and optionally log or rollbacл

    example usage:
    @handle_error([MapNoResultFound])
    async def get_one_by_field(cls, session: AsyncSession, **filter):
        result = await session.execute(select(cls.model).filter_by(**filter))
        return result.scalars().one()
    """

    def wrapper1(func: Callable):
        async def wrapper2(*args, **kwargs):
            try:
                result = await func(*args, **kwargs)
            except Exception as e:
                if rollback:
                    # get session from args for rollback
                    for item in args + tuple(kwargs.values()):
                        if isinstance(item, AsyncSession):
                            await item.rollback()

                for response in mapping_exception:
                    if isinstance(e, response.exception):
                        raise HTTPException(  # noqa: B904
                            status_code=response.status_code,
                            detail=response.detail,
                        )

                if log_error:
                    logger.error(func.__name__ + " " + str(e))

                raise HTTPException(status_code=500, detail="Unknown error occurred")  # noqa: B904
            return result

        return wrapper2

    return wrapper1
