from pydantic import BaseModel
from typing import Annotated

class Patient(BaseModel):
    email: str
    name: str
    dob: str
    age: int
    gender: str
    password: str
    pincode:int
    type:str
    currentAppointment: list[tuple[str,tuple]]
    patientHistory: Annotated[list[tuple[str,str]] | None, "contains date of appointment and doctor's name"] = None
