from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    TEST_MODE: bool
    DB_URL: str
    TEST_DB_URL: str

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
