from pydantic import BaseModel

class OTPVerifyRequest(BaseModel):
    email: str
    otp: str