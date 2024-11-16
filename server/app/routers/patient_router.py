from fastapi import APIRouter

from app.models.patient import Patient
from app.services.patient_service import PatientService
from app.shared.response import Response

app = APIRouter()

patient_service = PatientService()


@app.get("/healthCheck", response_model=Response)
async def health_check():
    return Response(status_code=200, body="I'm alive")


@app.get("/getConfig", response_model=Response)
async def get_config():
    config = PatientService.get_config()
    return Response(status_code=200, body=config)


@app.get("/pingMongo", response_model=Response)
async def ping_mongo():
    response = patient_service.ping_mongo()
    return Response(status_code=200, body=response)


@app.get("/getAllPatients", response_model=Response)
async def get_all_patients():
    patients = await patient_service.get_all_patients()
    print(patients)
    return Response(status_code=200, body=patients)


@app.post("/addPatient", response_model=Response)
async def add_patient(patient: Patient):
    created_time = await patient_service.add_patient(patient)
    return Response(status_code=201, body=created_time)
