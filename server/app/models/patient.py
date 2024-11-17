from pydantic import BaseModel


class Patient(BaseModel):
    username: str
    name: str
    dob: str
    age: int
    gender: str
