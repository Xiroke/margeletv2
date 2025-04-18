from pydantic_settings import BaseSettings, SettingsConfigDict


class GlobalSettings(BaseSettings):
    MONGO_INITDB_ROOT_USERNAME: str
    MONGO_INITDB_ROOT_PASSWORD: str
    MONGO_INITDB_HOST: str
    ME_CONFIG_BASICAUTH: str  # for docker

    model_config = SettingsConfigDict(env_file="../.env", env_file_encoding="utf-8")


class Settings(BaseSettings):
    TEST_MODE: bool
    DB_URL: str
    TEST_DB_URL: str
    INVITE_TOKEN_JWT: str

    SECRET_KEY_REFRESH: str

    # S3
    bucket_name: str  # s3 bucket
    endpoint: str  # url to s3
    access_key: str  # s3 username
    secret_key: str  # s3 password

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()

global_setttigns = GlobalSettings()
