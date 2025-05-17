import sys

import pytest
from fastapi import HTTPException
from fastapi.testclient import TestClient

sys.path.append("./")
from main import app
from src.db.dao import ChatDAO

client = TestClient(app)


@pytest.mark.asyncio
async def test_create_chat(session, group):
    response = client.post(
        "/api/chats", json={"title": "chat", "group_id": str(group.id)}
    )
    assert response.status_code == 200
    chat_db = await ChatDAO.get_one_or_none_by_field(session, title="chat")
    assert chat_db.title == "chat"


@pytest.mark.asyncio
async def test_get_chat(chat):
    response = client.get(f"/api/chats/{chat.id}")
    assert response.status_code == 200
    assert response.json()["title"] == chat.title


@pytest.mark.asyncio
async def test_update_chat(session, chat):
    response = client.patch(f"/api/chats/{chat.id}", json={"title": "New name chat"})
    assert response.status_code == 200
    await session.refresh(chat)
    assert chat.title == "New name chat"


@pytest.mark.asyncio
async def test_delete_chat(session, chat):
    response = client.delete(f"/api/chats/{str(chat.id)}")
    assert response.status_code == 200

    with pytest.raises(HTTPException):
        await ChatDAO.get_one_or_none_by_field(session, id=chat.id)
