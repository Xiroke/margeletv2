import sys

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.exc import NoResultFound

sys.path.append("./")
from src.db.dao import ChatDAO
from main import app

client = TestClient(app)


@pytest.mark.asyncio
async def test_create_chat(session, group):
    response = client.post("/api/chats", params={"title": "chat", "group_id": group.id})
    assert response.status_code == 200
    chat_db = await ChatDAO.get_one_by_field(session, title="chat")
    assert chat_db.title == "chat"


@pytest.mark.asyncio
async def test_get_chat(chat):
    response = client.get(f"/api/chats/{chat.id}")
    assert response.status_code == 200
    assert response.json()["title"] == chat.title


@pytest.mark.asyncio
async def test_update_chat(session, chat):
    response = client.patch(f"/api/chats/{chat.id}", params={"title": "New name chat"})
    assert response.status_code == 200
    await session.refresh(chat)
    assert chat.title == "New name chat"


@pytest.mark.asyncio
async def test_delete_chat(session, chat):
    response = client.delete(f"/api/chats/{chat.id}")
    assert response.status_code == 200

    with pytest.raises(NoResultFound):
        await ChatDAO.get_one_by_field(session, id=chat.id)
