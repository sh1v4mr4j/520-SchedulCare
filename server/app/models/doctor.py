from pydantic import BaseModel
from datetime import datetime

from server.app.models.location import Location

class Doctor(BaseModel):
    email: str
    name: str
    specialisation: str
    dob: str
    age: int
    gender: str
    password: str
    pincode:int
    scheduledApointment: bool = False
    location: Location

class Availability(BaseModel):
    doctor_email: str
    doctor_pincode: str
    availabilityStart: str
    availabilityEnd: str


