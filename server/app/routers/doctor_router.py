from typing import Annotated
from fastapi import APIRouter, Body
from app.services.doctor_service import DoctorService
from app.models.doctor import Doctor

from app.shared.response import Response
from app.models.location import Location


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
async def add_doctor(pincode: int):
    """
    Endpoint to get all doctors in a given pincode.

    Args:
        pincode (int): Pincode of the area.

    Returns:
        JSON response containing the list of doctors in the given pincode.
    """
    try:
        status_code, response = await doctor_service.get_doctor_by_pincode(pincode)
        return Response(status_code=status_code, body=response)
    except Exception as e:
        return Response(status_code=500, body=f"An error occurred: {str(e)}")
    
@app.post("/setAddress", response_model = Response)
async def set_address_for_doctor(doctor_email: Annotated[str, Body()], address: Annotated[Location, Body(embed=True)]):
    """
    Endpoint to set the address for a doctor.

    Args:
        doctor_email (str): Email of the doctor.
        address (Location): Address of the doctor.

    Returns:
        JSON response indicating success or failure.
    """
    try:
        status_code, response = await doctor_service.set_address_for_doctor(doctor_email, address)
        return Response(status_code=status_code, body={"message": response})
    except Exception as e:
        return Response(status_code=500, body=f"An error occurred: {str(e)}")
    

