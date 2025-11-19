from fastapi import FastAPI

from src.entries.websocket.schemas import (
    WsEventCreate,
    WsEventRead,
    WsMessageCreate,
    WsMessageRead,
)

schemas = WsEventCreate | WsEventRead | WsMessageCreate | WsMessageRead


def register_schemas(app: FastAPI):
    @app.get(
        "/register_schemas",
        response_model=schemas,
    )
    def register_schemas_route():
        """Register fastapi schemas in openapi"""
        pass
