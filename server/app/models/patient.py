from pydantic import BaseModel
from typing import Annotated
from typing import Tuple

from server.app.models.location import Location

class Appointment(BaseModel):
    patient_email: str
    doctor_email:str
    doctor_name: str
    appointment_date: str

class Patient(BaseModel):
    email: str
    name: str
    dob: str
    age: int
    gender: str
    password: str
    pincode:int
    appointments: list[Appointment]  = []
    address: Location
