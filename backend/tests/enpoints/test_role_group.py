import sys

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.exc import NoResultFound

sys.path.append("./")
from src.db.dao import RoleGroupDAO
from main import app

client = TestClient(app)


@pytest.mark.asyncio
async def test_create_role_group(session, group):
    response = client.post(
        "/api/roles_group", params={"title": "Role", "group_id": group.id}
    )
    assert response.status_code == 200
    role_group_db = await RoleGroupDAO.get_one_by_field(session, title="Role")
    assert role_group_db.title == "Role"


@pytest.mark.asyncio
async def test_get_role_group(role_group):
    response = client.get(f"/api/roles_group/{role_group.id}")
    assert response.status_code == 200
    assert response.json()["title"] == role_group.title


@pytest.mark.asyncio
async def test_update_role_group(session, role_group):
    response = client.patch(
        f"/api/roles_group/{role_group.id}", params={"title": "New name role_group"}
    )
    assert response.status_code == 200
    await session.refresh(role_group)
    assert role_group.title == "New name role_group"


@pytest.mark.asyncio
async def test_delete_role_group(session, role_group):
    response = client.delete(f"/api/roles_group/{role_group.id}")
    assert response.status_code == 200

    with pytest.raises(NoResultFound):
        await RoleGroupDAO.get_one_by_field(session, id=role_group.id)
