from ..group.schemas import CreateGroupSchema, ReadGroupSchema, UpdateGroupSchema


class ReadPersonalGroupSchema(ReadGroupSchema):
    title: str


class CreatePersonalGroupSchema(CreateGroupSchema):
    pass


class UpdatePersonalGroupSchema(UpdateGroupSchema):
    pass
