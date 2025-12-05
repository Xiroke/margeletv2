# initialization of all models
# without this, it is possible to access models that have not yet been initialized.
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from src.core.db.models import *  # noqa: F403


def register_fastapi(app: FastAPI):
    origins = [
        settings.BACKEND_URL,
        settings.FRONTEND_URL,
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:1420",
        "http://localhost:3000",
        "https://tauri.localhost",
        "tauri://localhost",
        "http://tauri.localhost",
        "tauri://localhost",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
