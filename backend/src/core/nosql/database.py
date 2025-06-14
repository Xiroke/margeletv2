from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from config import global_setttigns

from .models import IdToUsernameModel, MessageModel

client = AsyncIOMotorClient(
    f"mongodb://{global_setttigns.MONGO_INITDB_ROOT_USERNAME}:{global_setttigns.MONGO_INITDB_ROOT_PASSWORD}@{global_setttigns.MONGO_INITDB_HOST}:27017/",
    tz_aware=True,
)


async def init_mongo_db():
    await init_beanie(
        database=client.margelet, document_models=[MessageModel, IdToUsernameModel]
    )
