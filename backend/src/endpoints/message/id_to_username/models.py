from uuid import UUID

from beanie import Document


class IdToUsernameModel(Document):
    """
    Associate name username with his id
    This allow simple edit of username in all messages
    """

    user_id: UUID
    username: str

    class Settings:
        name = "id_to_username"
