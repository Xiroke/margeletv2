import sys

import pytest
from fastapi import HTTPException
from fastapi.testclient import TestClient

sys.path.append("./")
from src.db.dao import GroupDAO
from main import app

client = TestClient(app)


@pytest.mark.asyncio
async def test_create_group(session):
    response = client.post("/api/groups", json={"title": "Group"})
    assert response.status_code == 200
    group_db = await GroupDAO.get_one_by_field(session, title="Group")
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
        await GroupDAO.get_one_by_field(session, id=group.id)
