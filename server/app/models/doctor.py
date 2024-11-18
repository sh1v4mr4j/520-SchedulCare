from pydantic import BaseModel
from datetime import datetime

class Patient(BaseModel):
    email: str
    name: str
    specialisation: str
    dob: str
    age: int
    gender: str
    password: str
    pincode:int
    type:str
    availableDates: list[str] | list[datetime] | None
    appointmentDates: list[str] | list[datetime] | None





