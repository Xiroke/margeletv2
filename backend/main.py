import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import global_setttigns
from config_logging import setup_logging
from src.auth.router import router as auth_router
from src.chat.router import router as chat_router
from src.group.router import router as group_router
from src.message.router import router as message_router
from src.no_sql_db.database import init_mongo_db
from src.role_group.router import router as role_group_router

# set settings and color for logging
setup_logging()
logging.getLogger("pymongo").setLevel(logging.INFO)
logging.getLogger("multipart").setLevel(logging.INFO)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_mongo_db()
    yield


app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json", lifespan=lifespan)


origins = [global_setttigns.BACKEND_URL, global_setttigns.FRONTEND_URL]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In message_router there is a websocket route
# /api/messages/{chat_id}?token=jwt
app.include_router(prefix="/api", router=auth_router)
app.include_router(prefix="/api", router=group_router)
app.include_router(prefix="/api", router=chat_router)
app.include_router(prefix="/api", router=role_group_router)
app.include_router(prefix="/api", router=message_router)


@app.get("/api")
def ping():
    return "pong"


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
