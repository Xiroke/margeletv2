from typing import Literal

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class ConfigBase(BaseSettings):
    model_config = SettingsConfigDict(
        env_file="../.env", env_file_encoding="utf-8", extra="ignore"
    )


class SQLDBSettings(ConfigBase):
    URL: str
    TEST_URL: str
    USER: str
    PASSWORD: str
    DB: str
    DB_TEST: str
    PORT: str

    model_config = SettingsConfigDict(env_prefix="SQLDB_")


class NOSQLDBSettings(ConfigBase):
    USERNAME: str
    PASSWORD: str
    HOST: str
    ME_CONFIG_BASICAUTH: str  # for docker

    model_config = SettingsConfigDict(env_prefix="NOSQLDB_")


class S3Settings(ConfigBase):
    USER: str
    PASSWORD: str
    PORT: str
    BUCKET_NAME: str
    PATH: str

    model_config = SettingsConfigDict(env_prefix="S3_")


class RedisSettings(ConfigBase):
    HOST: str
    PORT: int

    model_config = SettingsConfigDict(env_prefix="REDIS_")


class SMTPSettings(ConfigBase):
    HOST: str
    PORT: int
    USER: str
    PASSWORD: str

    model_config = SettingsConfigDict(env_prefix="SMTP_")


class SecretSettings(ConfigBase):
    INVITE_TOKEN: str
    KEY_REFRESH: str
    RESET_PASSWORD_TOKEN: str
    VERIFICATION_TOKEN: str

    model_config = SettingsConfigDict(env_prefix="SECRET_")


class Settings(ConfigBase):
    DEV: bool
    TEST_MODE: bool

    sqldb: SQLDBSettings = Field(default_factory=SQLDBSettings)  # type: ignore
    nosqldb: NOSQLDBSettings = Field(default_factory=NOSQLDBSettings)  # type: ignore
    redis: RedisSettings = Field(default_factory=RedisSettings)  # type: ignore
    s3: S3Settings = Field(default_factory=S3Settings)  # type: ignore
    smtp: SMTPSettings = Field(default_factory=SMTPSettings)  # type: ignore
    secrets: SecretSettings = Field(default_factory=SecretSettings)  # type: ignore

    COOKIE_HTTPONLY: bool
    COOKIE_SECURE: bool
    COOKIE_SAMESITE: Literal["lax", "strict", "none"]

    JWT_ACCESS_TOKEN_SECRET_KEY: str
    JWT_ALGORITHM: str
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int

    BACKEND_URL: str
    FRONTEND_URL: str

    model_config = SettingsConfigDict(
        env_file="../.env", env_file_encoding="utf-8", extra="ignore"
    )


settings = Settings()  # type: ignore

__all__ = ["settings"]
