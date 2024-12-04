import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import ssl

class EmailService:
    def __init__(self):
        self.sender_email = "your_email@gmail.com"  # Replace with your email
        self.password = "your_email_password"  # Use App Passwords if 2FA is enabled

    def send_email(self, receiver_email: str, subject: str, body: str):
        # Create the message
        message = MIMEMultipart()
        message["From"] = self.sender_email
        message["To"] = receiver_email
        message["Subject"] = subject
        message.attach(MIMEText(body, "plain"))

        # Connect to the Gmail SMTP server
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(self.sender_email, self.password)
            server.sendmail(self.sender_email, receiver_email, message.as_string())

        print("Email sent successfully!")
