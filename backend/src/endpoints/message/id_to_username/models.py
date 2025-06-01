from uuid import UUID

from beanie import Document


class IdToUsernameModel(Document):
    """
    Associate name username with his id
    This allow simple edit of username in all messages
    """

    id: UUID  # id of user
    username: str

    class Settings:
        name = "id_to_username"
