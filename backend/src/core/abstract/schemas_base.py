from pydantic import BaseModel, ConfigDict


class SchemaBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)


class SchemaBaseRead(SchemaBase):
    pass


class SchemaBaseCreate(SchemaBase):
    model_config = ConfigDict(from_attributes=True)


class SchemaBaseUpdate(SchemaBase):
    model_config = ConfigDict(from_attributes=True)
