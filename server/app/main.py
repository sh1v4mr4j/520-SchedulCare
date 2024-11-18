from dotenv import load_dotenv
import sys
from fastapi import FastAPI
from app.routers import patient_router
from app.routers import doctor_router

def load_environment():
    """
    Load environment variables from .env file
    """

    print(sys.argv)
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

# Health check endpoint
@app.get("/healthCheck", response_model=Response)
async def health_check():
    return Response(status_code=200, body="I'm alive")

# Include the routers
app.include_router(patient_router.app, prefix="/patients", tags=["patients"])
app.include_router(doctor_router.app, prefix="/doctors", tags=["Doctor"])