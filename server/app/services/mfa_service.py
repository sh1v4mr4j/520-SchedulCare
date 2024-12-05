import pyotp
import base64
from io import BytesIO
import qrcode

class MFAService:
    def __init__(self):
        self.otp = pyotp.TOTP(pyotp.random_base32())  # Generate a random secret key for OTP

    def generate_mfa_secret(self):
        """
        Generate a random secret key for OTP.
        """
        return pyotp.random_base32()

    def generate_otp(self, secret: str) -> str:
        """
        Generates OTP using the secret key for the user.
        """
        totp = pyotp.TOTP(secret)
        return totp.now()

    def verify_otp(self, secret: str, otp: int) -> bool:
        """
        Verifies the OTP entered by the user against the stored secret.
        """
        totp = pyotp.TOTP(secret)
        current_otp = totp.now()
        if int(current_otp) == int(otp):
            return 200, "OTP verified successfully"
        else:
            return 401, "Invalid OTP"

    def generate_qr_code(self, secret: str, user_email: str) -> BytesIO:
        """
        Generates a QR code image for OTP configuration.
        """
        totp_uri = self.otp.provisioning_uri(user_email, issuer_name="Schedulcare")
        img = qrcode.make(totp_uri)
        img_byte_arr = BytesIO()
        img.save(img_byte_arr)
        img_byte_arr.seek(0)
        return img_byte_arr
    
    async def generate_register_url(self, secret: str, email: str):
        """
        Generates a registration URL for the user to configure OTP.
        """
        register_url = pyotp.totp.TOTP(secret).provisioning_uri(name=email, issuer_name="Schedulcare")
        print(register_url)
        return 200, register_url


