# otp_router.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.otp_service import OTPService

# Define the Pydantic model for request validation
class OTPVerifyRequest(BaseModel):
    otp: str
    secret: str

# Initialize the router
router = APIRouter()

# Initialize the OTP service
otp_service = OTPService()

@router.post("/verify_otp")
async def verify_otp(data: OTPVerifyRequest):
    otp = data.otp
    otp_secret = data.secret

    if otp_service.verify_otp(otp_secret, otp):
        return {"status": "success"}
    else:
        raise HTTPException(status_code=401, detail="Invalid OTP")
