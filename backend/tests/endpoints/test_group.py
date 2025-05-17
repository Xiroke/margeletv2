import sys

import pytest
from fastapi import HTTPException
from fastapi.testclient import TestClient

sys.path.append("./")
from main import app
from src.db.dao import GroupDAO

client = TestClient(app)


@pytest.mark.asyncio
async def test_create_group(session):
    response = client.post("/api/groups", json={"title": "Group"})
    assert response.status_code == 200
    group_db = await GroupDAO.get_one_or_none_by_field(session, title="Group")
    assert group_db.title == "Group"


@pytest.mark.asyncio
async def test_get_group(group):
    response = client.get(f"/api/groups/{group.id}")
    assert response.status_code == 200
    assert response.json()["title"] == group.title


@pytest.mark.asyncio
async def test_update_group(session, group):
    response = client.patch(f"/api/groups/{group.id}", json={"title": "New name group"})
    assert response.status_code == 200
    await session.refresh(group)
    assert group.title == "New name group"


@pytest.mark.asyncio
async def test_delete_group(session, group):
    response = client.delete(f"/api/groups/{group.id}")
    assert response.status_code == 200

    with pytest.raises(HTTPException):
        await GroupDAO.get_one_or_none_by_field(session, id=group.id)


@pytest.mark.asyncio
async def test_get_my_groups(session, group):
    response = client.get("/api/groups/user_groups/me")
    assert response.status_code == 200
    assert response.json()[0]["title"] == group.title
