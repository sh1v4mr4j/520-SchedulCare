from pydantic import BaseModel

class Location(BaseModel):
    name: str ="default"
    lat: float = 0.0
    lon: float = 0.0
    plus_code: str = "xx"