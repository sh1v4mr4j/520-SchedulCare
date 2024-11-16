from fastapi import APIRouter

from app.shared.response import Response
from app.services.patient_service import PatientService

app = APIRouter()

patient_service = PatientService()

@app.get("/healthCheck")
async def health_check():
    return Response(status_code=200, body="I'm alive")

@app.get("/getConfig")
async def get_config():
    config = PatientService.get_config()
    return Response(status_code=200, body=config)

@app.get("/pingMongo")
async def ping_mongo():
    response = patient_service.ping_mongo()
    return Response(status_code=200, body=response)