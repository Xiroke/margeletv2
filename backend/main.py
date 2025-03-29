from fastapi import FastAPI

from src.auth.router import router as auth_router
from src.group.router import router as group_router
from src.chat.router import router as chat_router
from src.personal_chat.router import router as personal_chat_router
from src.role_group.router import router as role_group_router

app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")

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
