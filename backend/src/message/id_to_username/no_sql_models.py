from uuid import UUID

from beanie import Document


class IdToUsername(Document):
    id: UUID
    username: str

    class Settings:
        name = "id_to_username"
