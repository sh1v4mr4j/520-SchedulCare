# otp_router.py
from typing import Annotated
from fastapi import APIRouter, Body
from pydantic import BaseModel
from app.services.mfa_service import MFAService
from app.shared.response import Response

# Define the Pydantic model for request validation
class OTPVerifyRequest(BaseModel):
    otp: str
    secret: str

# Initialize the router
router = APIRouter()

# Initialize the MFA service
mfa_service = MFAService()

@router.post("/generateQrCode", response_model=Response)
async def generate_qr_code(email: Annotated[str, Body(embed=True)]):
    status_code, response = await mfa_service.generate_register_url(email)
    return Response(status_code=status_code, body=response)

@router.post("/verifyOtp", response_model=Response)
async def verify_otp(secret: Annotated[str, Body(embed=True)], otp: Annotated[int, Body(embed=True)]):
    status_code, response = mfa_service.verify_otp(secret, otp)
    return Response(status_code=status_code, body=response)
