import redis.asyncio as redis

from config import global_setttigns

redis_client = redis.Redis(
    host=global_setttigns.REDIS_HOST, port=global_setttigns.REDIS_PORT, db=0
)

__all__ = ["redis_client"]
