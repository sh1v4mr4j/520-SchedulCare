from pydantic import BaseModel
from datetime import datetime

class Doctor(BaseModel):
    email: str
    name: str
    specialisation: str
    dob: str
    age: int
    gender: str
    password: str
    pincode:int
    type:str
    scheduledApointment: bool = False

class Availability(BaseModel):
    doctor_email: str
    doctor_pincode: str
    availabilityStart: str
    availabilityEnd: str


