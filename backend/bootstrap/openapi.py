from fastapi import FastAPI

from src.entries.websocket.schemas import (
    WsInDataSchema,
    WsInMessageSchema,
    WsOutDataSchema,
    WsOutMessageSchema,
)

schemas = WsInDataSchema | WsOutDataSchema | WsInMessageSchema | WsOutMessageSchema


def register_schemas(app: FastAPI):
    @app.get("/register_schemas", response_model=schemas)
    def register_schemas_route():
        pass
