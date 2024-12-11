from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from app.models.location import Location

class Appointment(BaseModel):
    patient_email: str
    doctor_email:str
    doctor_name: str
    appointment_date: str

class Patient(BaseModel):
    email: str
    name: str
    dob: str
    gender: str
    password: str
    appointments: list[Appointment]  = []
    pincode: int
    address: Optional[Location] = {}
    secret: Optional[str] = None
