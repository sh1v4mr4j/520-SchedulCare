# import os
# from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
# from fastapi import HTTPException

# class EmailService:
#     def __init__(self):
#         self.email_config = ConnectionConfig(
#             MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
#             MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
#             MAIL_FROM="no-reply@mailtrap.io",
#             MAIL_PORT=587,
#             MAIL_SERVER="sandbox.smtp.mailtrap.io",
#             MAIL_STARTTLS=True,
#             MAIL_SSL_TLS=False,
#             USE_CREDENTIALS=True,
#         )
#         self.mail_client = FastMail(self.email_config)

#     async def send_email(self, email: str, subject: str, message: str):
#         """
#         Sends an email to the specified recipient
#         :param email: Recipient's email address
#         :param subject: Email subject
#         :param message: Email body content
#         :return: Success message or raises HTTPException
#         """
#         msg = MessageSchema(
#             subject=subject,
#             recipients=[email],
#             body=message,
#             subtype="plain",
#         )
#         try:
#             resp = await self.mail_client.send_message(msg)
#             print(resp)
#             return {"success": True, "message": "Email sent successfully"}
#         except Exception as e:
#             raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")
        

