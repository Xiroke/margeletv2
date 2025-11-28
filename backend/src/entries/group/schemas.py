from pydantic import BaseModel

from src.entries.group.personal_group.models import PersonalGroupModel
from src.entries.group.personal_group.schemas import PersonalGroupRead
from src.entries.group.simple_group.models import SimpleGroupModel
from src.entries.group.simple_group.schemas import SimpleGroupRead
from src.entries.message.schemas import MessageRead

AutoGroupModel = PersonalGroupModel | SimpleGroupModel

group_model_to_schema_map: dict[type[AutoGroupModel], type[BaseModel]] = {
    PersonalGroupModel: PersonalGroupRead,
    SimpleGroupModel: SimpleGroupRead,
}


class InvitationTokenSchema(BaseModel):
    group_id: str


AutoGroupRead = SimpleGroupRead | PersonalGroupRead


class AutoGroupsAndMessagesRead(BaseModel):
    messages: list[MessageRead]
    groups: list[AutoGroupRead]


__all__ = ["AutoGroupRead", "group_model_to_schema_map"]
