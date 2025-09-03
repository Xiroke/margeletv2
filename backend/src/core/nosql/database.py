from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from config import settings

from .models import MessageModel

client = AsyncIOMotorClient(
    f"mongodb://{settings.nosqldb.USERNAME}:{settings.nosqldb.PASSWORD}@{settings.nosqldb.HOST}:27017/",
    tz_aware=True,
)


async def init_mongo_db():
    await init_beanie(database=client.margelet, document_models=[MessageModel])
