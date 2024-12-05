from pydantic import BaseModel

class Appointment(BaseModel):
    patient_email: str
    doctor_email: str
    date: str