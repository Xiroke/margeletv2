from contextlib import asynccontextmanager

from fastapi import FastAPI

from bootstrap.exceptions_fastapi import register_exception_handler
from bootstrap.fastapi import register_fastapi
from bootstrap.logging import register_logging
from bootstrap.permissions import register_permission
from bootstrap.routes import register_routes
from config import settings
from src.core.nosql.database import init_mongo_db

register_logging()
register_permission()


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_mongo_db()
    yield


app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json", lifespan=lifespan)


register_exception_handler(app)
register_fastapi(app)
register_routes(app)


@app.get(
    "/api/healthcheck",
)
def ping():
    return "ok"


if __name__ == "__main__":
    assert not settings.TEST_MODE
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True, workers=1)
