from ..schemas import CreateGroupSchema, ReadGroupSchema, UpdateGroupSchema


class ReadPersonalGroupSchema(ReadGroupSchema):
    pass


class CreatePersonalGroupSchema(CreateGroupSchema):
    description: str


class UpdatePersonalGroupSchema(UpdateGroupSchema):
    description: str | None = None
    avatar_path: str | None = None
