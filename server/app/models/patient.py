from pydantic import BaseModel
from typing import Optional
from datetime import date

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
    pincode:int
    appointments: list[Appointment]  = []
    address: Optional[Location] = {}
    otp_secret:str=""
