from typing import Optional
from pydantic import BaseModel
from datetime import datetime

from app.models.location import Location

class Doctor(BaseModel):
    email: str
    name: str
    specialisation: str
    dob: str
    gender: str
    password: str
    pincode:int
    scheduledApointment: bool = False
    location: Optional[Location] = {}

class DoctorSchedule(BaseModel):
    doctor_email: str
    doctor_pincode: int
    startDate: datetime
    endDate: datetime

