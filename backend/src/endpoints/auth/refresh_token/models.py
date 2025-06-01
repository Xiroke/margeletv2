from fastapi_users_db_sqlalchemy.access_token import SQLAlchemyBaseAccessTokenTableUUID

from src.core.db.database import Base


class TokenModel(SQLAlchemyBaseAccessTokenTableUUID, Base):
    __tablename__ = "refresh_token"
