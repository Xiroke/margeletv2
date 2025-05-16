from typing import Literal

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

    BACKEND_URL: str
    FRONTEND_URL: str

    model_config = SettingsConfigDict(
        env_file="../.env", env_file_encoding="utf-8", extra="ignore"
    )


class Settings(BaseSettings):
    DEV: bool
    TEST_MODE: bool

    DB_URL: str
    TEST_DB_URL: str

    INVITE_TOKEN_JWT: str
    SECRET_KEY_REFRESH: str

    COOKIE_HTTPONLY: bool
    COOKIE_SECURE: bool
    COOKIE_SAMESITE: Literal["lax", "strict", "none"]

    S3_BUCKET_NAME: str
    S3_PATH: str

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()  # type: ignore

global_setttigns = GlobalSettings()  # type: ignore
