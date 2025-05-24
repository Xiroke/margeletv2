from httpx import AsyncClient

from src.endpoints.group.models import GroupModel

# def test_load_avatar(client: TestClient, group: GroupModel):
#     res = client.get(f"/groups/avatar/{group.id}")
#     assert res.status_code == 200


# def test_upload_avatar(client: TestClient, group: GroupModel):
#     files = {"image": ("avatar.jpg", io.BytesIO(b"1234"), "image/jpeg")}
#     res = client.post(f"/groups/avatar/{group.id}", files=files)
#     assert res.status_code == 200


# def test_load_panorama(client: TestClient, group: GroupModel):
#     res = client.get(f"/groups/panorama/{group.id}")
#     assert res.status_code == 200


# def test_upload_panorama(client: TestClient, group: GroupModel):
#     files = {"image": ("panorama.jpg", io.BytesIO(b"5678"), "image/jpeg")}
#     res = client.post(f"/groups/panorama/{group.id}", files=files)
#     assert res.status_code == 200


# def test_get_invite_token(client: TestClient, group: GroupModel):
#     res = client.get(f"/groups/invite/{group.id}")
#     assert res.status_code == 200
#     token = res.text
#     payload = jwt.decode(token, settings.INVITE_TOKEN_JWT, algorithms=["HS256"])
#     assert payload["group_id"] == str(group.id)
#     # user_id присутствует и валиден
#     UUID(payload["user_id"])


# def test_get_my_groups(client: TestClient, group: GroupModel):
#     res = client.get("/groups/user_groups/me")
#     assert res.status_code == 200
#     data = res.json()
#     assert isinstance(data, list)
#     assert all("id" in g and "title" in g for g in data)


# def test_get_user_groups(client: TestClient, group: GroupModel):
#     uid = uuid4()
#     res = client.get(f"/groups/user_groups/{uid}")
#     assert res.status_code == 200
#     data = res.json()
#     assert isinstance(data, list)


async def test_get_group(client: AsyncClient, group: GroupModel):
    res = await client.get(f"/groups/{group.id}")
    assert res.status_code == 200

    assert res.json().id == group.id


async def test_create_group(client: AsyncClient):
    payload = {"title": "new group"}
    res = await client.post("/groups/", json=payload)
    assert res.status_code == 200

    assert res.json().title == "new group"


async def test_update_group(client: AsyncClient, group: GroupModel):
    payload = {"title": "updated"}
    res = await client.patch(f"/groups/{group.id}", json=payload)
    assert res.status_code == 200

    assert res.json().title == "updated"
    assert res.json().id == group.id


async def test_delete_group(client: AsyncClient, group: GroupModel):
    res = await client.delete(f"/groups/{group.id}")
    assert res.status_code == 200
