from typing import Annotated

import redis.asyncio as redis
from fastapi import Depends
from redis.asyncio import Redis

from config import settings


async def get_redis_storage():
    pool = redis.ConnectionPool.from_url(
        "redis://" + settings.redis.HOST + ":" + str(settings.redis.PORT),
    )
    client = redis.Redis.from_pool(pool)
    yield client
    await client.aclose()


redis_storage = Annotated[Redis, Depends(get_redis_storage)]

__all__ = ["redis_storage"]
