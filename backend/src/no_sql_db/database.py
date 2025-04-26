from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from .models import MessageModel, IdToUsername

from config import global_setttigns

client = AsyncIOMotorClient(
    f"mongodb://{global_setttigns.MONGO_INITDB_ROOT_USERNAME}:{global_setttigns.MONGO_INITDB_ROOT_PASSWORD}@{global_setttigns.MONGO_INITDB_HOST}:27017/"
)


async def init_mongo_db():
    await init_beanie(
        database=client.margelet, document_models=[MessageModel, IdToUsername]
    )
