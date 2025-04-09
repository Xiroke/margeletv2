from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.auth.router import router as auth_router
from src.group.router import router as group_router
from src.chat.router import router as chat_router
from src.personal_chat.router import router as personal_chat_router
from src.role_group.router import router as role_group_router
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

app.include_router(prefix="/api", router=auth_router)
app.include_router(prefix="/api", router=group_router)
app.include_router(prefix="/api", router=personal_chat_router)
app.include_router(prefix="/api", router=chat_router)
app.include_router(prefix="/api", router=role_group_router)


@app.get("/api")
def ping():
    return "pong"


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
