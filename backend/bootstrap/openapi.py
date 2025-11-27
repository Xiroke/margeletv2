"""
This module registers schemas with OpenAPI as they should be
captured by openapi-ts which parses the api and extracts schemas
"""

from fastapi import FastAPI

from src.entries.websocket.schemas import (
    WsBaseEvent,
    WsEventCategoryEnum,
    WsEventCreate,
    WsMessageCreate,
    WsMessageRead,
    WsMessageUpdate,
)

schemas = (
    WsEventCreate
    | WsMessageCreate
    | WsMessageRead
    | WsMessageUpdate
    | WsEventCategoryEnum
    | WsBaseEvent
)


def register_schemas(app: FastAPI):
    @app.get(
        "/register_schemas",
        response_model=schemas,
    )
    def register_schemas_route():
        """Register fastapi schemas in openapi"""
        pass
