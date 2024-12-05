# otp_router.py
from typing import Annotated
from fastapi import APIRouter, Body, HTTPException
from pydantic import BaseModel
from app.services.otp_service import OTPService
from app.services.mfa_service import MFAService
from app.shared.response import Response

# Define the Pydantic model for request validation
class OTPVerifyRequest(BaseModel):
    otp: str
    secret: str

# Initialize the router
router = APIRouter()

# Initialize the OTP service
otp_service = OTPService()
mfa_service = MFAService()

@router.post("/verify_otp")
async def verify_otp(data: OTPVerifyRequest):
    otp = data.otp
    otp_secret = data.secret

    if otp_service.verify_otp(otp_secret, otp):
        return {"status": "success"}
    else:
        raise HTTPException(status_code=401, detail="Invalid OTP")

@router.post("/generateQrCode", response_model=Response)
async def generate_qr_code(email: Annotated[str, Body(embed=True)]):
    status_code, response = await mfa_service.generate_register_url(email)
    return Response(status_code=status_code, body=response)

@router.post("/verifyOtp", response_model=Response)
async def verify_otp(email: Annotated[str, Body(embed=True)], otp: Annotated[int, Body(embed=True)]):
    status_code, response = await mfa_service.verify_otp(email, otp)
    return Response(status_code=status_code, body=response)
