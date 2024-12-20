from typing import Annotated
from fastapi import APIRouter, Body,HTTPException,Depends

from app.models.patient import Patient, Appointment
from app.models.login import Login
from app.services.patient_service import PatientService
from app.shared.response import Response
from app.tests.mock.mock_patient import mock_patient
from app.models.location import Location

app = APIRouter()

patient_service = PatientService()


# Route to verify successful connection with MongoDB
@app.get("/pingMongo", response_model=Response)
async def ping_mongo():
    response = patient_service.ping_mongo()
    return Response(status_code=200, body=response)

# Route to get patient by the email
@app.get("/{email}/patient", response_model=Response)
async def get_patient_by_email(email: str):
    status_code, patient_data = await patient_service.get_patient_by_email(email)
    return Response(status_code=status_code, body=patient_data)


# Route to fetch all patients from collection
@app.get("/getAllPatients", response_model=Response)
async def get_all_patients():
    patients = await patient_service.get_all_patients()
    print(patients)
    return Response(status_code=200, body=patients)


# Route to add patient to Collection
@app.post("/addPatient", response_model=Response)
async def add_patient(patient: Annotated[Patient, Body()]):
    status_code, body = await patient_service.add_patient(patient)
    return Response(status_code=status_code, body=body)

# Route for scheduling payment appointment
@app.put("/{email}/scheduleAppointment", response_model = Response)
async def schedule_appointment(email:str, appointment_details: Appointment):
    status, schedule_appointment = await patient_service.scheduleappointment(email, appointment_details)
    return Response(status_code = status, body = schedule_appointment)

# Route to set the location
@app.post("/setLocation", response_model = Response)
async def set_location_for_patient(email: Annotated[str, Body()], location: Annotated[Location, Body(embed=True)]):
    """
    Endpoint to set the address for a doctor.

    Args:
        doctor_email (str): Email of the doctor.
        address (Location): Address of the doctor.

    Returns:
        JSON response indicating success or failure.
    """
    try:
        status_code, response = await patient_service.set_location_for_patient(email, location)
        return Response(status_code=status_code, body={"message": response})
    except Exception as e:
        return Response(status_code=500, body=f"An error occurred: {str(e)}")

# Route for pateint login 
@app.post("/patientLogin", response_model=Response)
async def login_patient(data: Login):
    """
    Login a patient with email and password.
    """
    status_code, response = await patient_service.login_patient(data)
    return Response(status_code=status_code, body=response)



