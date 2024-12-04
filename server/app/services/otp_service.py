# app/services/otp_service.py
import pyotp
import qrcode
from io import BytesIO

class OTPService:
    def generate_otp_secret(self, email: str) -> str:
        """
        Generate a new OTP secret for a given email.
        """
        return pyotp.random_base32()

    def generate_qr_code(self, otp_secret: str, email: str) -> BytesIO:
        """
        Generate a QR code image for the OTP secret.
        """
        otp_uri = pyotp.totp.TOTP(otp_secret).provisioning_uri(name=email, issuer_name="YourAppName")
        qr = qrcode.make(otp_uri)
        img_byte_arr = BytesIO()
        qr.save(img_byte_arr, format='PNG')
        img_byte_arr.seek(0)
        return img_byte_arr

    def verify_otp(self, otp_secret: str, otp_code: str) -> bool:
        """
        Verify the provided OTP code against the stored OTP secret.
        """
        totp = pyotp.TOTP(otp_secret)
        return totp.verify(otp_code)
