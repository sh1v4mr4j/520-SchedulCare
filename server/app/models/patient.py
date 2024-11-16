from typing import Optional

from pydantic import BaseModel

class Patient(BaseModel):
    id: Optional[str]
    name: str
    dob: str
    age: int
    gender: str