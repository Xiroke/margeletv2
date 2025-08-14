import redis.asyncio as redis

from config import settings

redis_client = redis.Redis(host=settings.redis.HOST, port=settings.redis.PORT, db=0)

__all__ = ["redis_client"]
