import asyncio

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.auth.router import router as auth_router
from src.group.router import router as group_router
from src.chat.router import router as chat_router
from src.personal_chat.router import router as personal_chat_router
from src.role_group.router import router as role_group_router
from src.message.router import router as message_router
from src.no_sql_db.database import init_mongo_db
from config_logging import setup_logging

# set settings and color for logging
setup_logging()

app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8000",
]

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
app.include_router(prefix="/api", router=personal_chat_router)
app.include_router(prefix="/api", router=chat_router)
app.include_router(prefix="/api", router=role_group_router)
app.include_router(prefix="/api", router=message_router)


async def main():
    await init_mongo_db()


@app.get("/api")
def ping():
    return "pong"


if __name__ == "__main__":
    asyncio.run(main())
    import uvicorn

    uvicorn.run("main:app", port=8000, reload=True)
