from fastapi import FastAPI
from routers import patients

app = FastAPI()

app.include_router(patients.app, prefix="/patients", tags=["patients"])