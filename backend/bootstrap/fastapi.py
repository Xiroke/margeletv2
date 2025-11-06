from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings

# initialization of all models
# without this, it is possible to access models that have not yet been initialized.
from src.core.db.models import *  # noqa: F403


def register_fastapi(app: FastAPI):
    origins = [settings.BACKEND_URL, settings.FRONTEND_URL]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
