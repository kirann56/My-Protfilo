from pydantic_settings import BaseSettings,SettingsConfigDict

class Settings(BaseSettings):
    database:str
    database_name:str
    password:str
    host:str
    database_port:int
    db_name:str
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="allow"   # <-- allow unknown fields
    )
settings = Settings()