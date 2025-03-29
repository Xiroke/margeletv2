import sys

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.exc import NoResultFound

sys.path.append("./")
from src.db.dao import PersonalChatDAO
from main import app

client = TestClient(app)


@pytest.mark.asyncio
async def test_create_personal_chat(session):
    response = client.post("/api/personal_chats", params={"title": "Personal chat"})
    assert response.status_code == 200
    personal_chat_db = await PersonalChatDAO.get_one_by_field(
        session, title="Personal chat"
    )
    assert personal_chat_db.title == "Personal chat"


@pytest.mark.asyncio
async def test_get_personal_chat(personal_chat):
    response = client.get(f"/api/personal_chats/{personal_chat.id}")
    assert response.status_code == 200
    assert response.json()["title"] == personal_chat.title


@pytest.mark.asyncio
async def test_update_personal_chat(session, personal_chat):
    response = client.patch(
        f"/api/personal_chats/{personal_chat.id}",
        params={"title": "New name personal_chat"},
    )
    assert response.status_code == 200
    await session.refresh(personal_chat)
    assert personal_chat.title == "New name personal_chat"


@pytest.mark.asyncio
async def test_delete_personal_chat(session, personal_chat):
    response = client.delete(f"/api/personal_chats/{personal_chat.id}")
    assert response.status_code == 200

    with pytest.raises(NoResultFound):
        await PersonalChatDAO.get_one_by_field(session, id=personal_chat.id)
