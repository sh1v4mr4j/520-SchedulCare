from pydantic import BaseModel

class NoBiggie(BaseModel):
    age: int
    name: str