from dotenv import load_dotenv
import sys
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from app.routers import patient_router
from app.routers import doctor_router
from app.shared.response import Response
from app.routers import payment_router
from app.routers import email_router
from app.routers import chat_router
from app.routers import appointment_router
from app.routers import mfa_router

def load_environment():
    """
    Load environment variables from .env file
    """
    run_mode = sys.argv[1] if len(sys.argv) > 1 else "prod"
    print(f"Running in {run_mode} mode")
    if run_mode == "dev":
        load_dotenv("../.env.dev")
    else:
        load_dotenv("../.env.prod")

# Load the environment variables
load_environment()

# Create the FastAPI app
app = FastAPI()

# Add CORS middleware to the FastAPI app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust the origin to match your frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all HTTP headers
)

# Health check endpoint
@app.get("/healthCheck", response_model=Response)
async def health_check():
    return Response(status_code=200, body="I'm alive")

# Include the routers
app.include_router(patient_router.app, prefix="/patients", tags=["Patients"])
app.include_router(doctor_router.app, prefix="/doctors", tags=["Doctor"])
app.include_router(payment_router.app, prefix="/payments", tags=["Payments"])
app.include_router(email_router.app, prefix="/email", tags=["EmailNotification"])
app.include_router(chat_router.app, prefix="/chat", tags=["Chat"])
app.include_router(appointment_router.app, prefix="/appointment", tags=["Appointment"])
app.include_router(mfa_router.router, prefix="/mfa", tags=["otp"])
