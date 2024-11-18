from fastapi import APIRouter
from app.services.doctor_service import DoctorService
from app.models.doctor import Doctor

from app.shared.response import Response


app = APIRouter()

doctor_service = DoctorService()

@app.get("/", response_model=Response)
async def health_check():
    return Response(status_code=200, body="I will make sure you're alive.")

@app.post("/add", response_model = Response)
async def add_doctor(doctor: Doctor):
    """
    Endpoint to add a new doctor to the database.

    Args:
        doctor (Doctor): A Doctor object containing doctor details.

    Returns:
        JSON response indicating success or failure.
    """
    print("jai shri ram")
    try:
        response = await doctor_service.add_doctor(doctor)
        return Response(status_code = 201, body ={"message": "Doctor added successfully", "data": response})
    except Exception as e:
        return Response(status_code=500, body=f"An error occurred: {str(e)}")

@app.get("/{pincode}/allDoctors", response_model=Response)
async def add_doctor(self, pincode: int):
    """
    Gets all doctor in the given area (pincode)
    """
    try:
        doctors = await self.doctor_collection.find({"pincode": pincode}).to_list(length=10)
        return Response(status_code=200,body=doctors)
    except:
        return Response(status_code=500, body=f"An error occured: {str(e)}")
    

