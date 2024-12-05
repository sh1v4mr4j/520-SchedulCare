from typing import Annotated
from fastapi import APIRouter, Body
from app.services.appointment_service import AppointmentService
from app.models.appointment import Appointment

app = APIRouter()

appointment_service = AppointmentService()

@app.post("/add")
async def add_appointment(appointment: Annotated[Appointment,Body(embed=True)]):
    print("Request received")
    return await appointment_service.add_appointment_details(appointment)