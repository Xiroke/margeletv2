from pydantic_settings import BaseSettings, SettingsConfigDict


class GlobalSettings(BaseSettings):
    MONGO_INITDB_ROOT_USERNAME: str
    MONGO_INITDB_ROOT_PASSWORD: str
    MONGO_INITDB_HOST: str
    ME_CONFIG_BASICAUTH: str  # for docker

    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    POSTGRES_PORT: str

    S3_USER: str
    S3_PASSWORD: str
    S3_PORT: str

    model_config = SettingsConfigDict(env_file="../.env", env_file_encoding="utf-8")


class Settings(BaseSettings):
    TEST_MODE: bool
    DB_URL: str
    TEST_DB_URL: str
    INVITE_TOKEN_JWT: str

    SECRET_KEY_REFRESH: str

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()

global_setttigns = GlobalSettings()
