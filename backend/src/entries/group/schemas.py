from pydantic import BaseModel


class InvitationTokenSchema(BaseModel):
    group_id: str
