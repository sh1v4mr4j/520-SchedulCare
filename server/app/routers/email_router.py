# from typing import Annotated
# from fastapi import APIRouter, Body
# from app.services.email_notification_service import EmailService

# app = APIRouter()

# email_service = EmailService()

# @app.post("/send-email/")
# async def send_email(email: Annotated[str, Body()], subject: Annotated[str, Body()], message: Annotated[str, Body()]):
#     print("Request received")
#     return await email_service.send_email(email, subject, message)
