from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings


def register_fastapi(app: FastAPI):
    if settings.DEV:
        origins = ["*"]
    else:
        origins = [settings.BACKEND_URL, settings.FRONTEND_URL]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
