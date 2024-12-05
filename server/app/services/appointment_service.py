import os
from motor.motor_asyncio import AsyncIOMotorClient
from app.models.appointment import Appointment

class AppointmentService:
    def __init__(self):
        self.uri = os.getenv("MONGO_URI")
        self.client = AsyncIOMotorClient(self.uri)

        # Keep the database and collection as instance variables
        self.database = self.client["schedulcare"]

        # Appointments collection
        self.appointments_collection = self.database["appointments"]

    def ping_mongo(self):
        """
        Ping the MongoDB deployment. If the ping is successful, return a success message.
        Else, return the error message.
        """
        try:
            self.client.admin.command('ping')
            return "Pinged your deployment. You successfully connected to MongoDB!"
        except Exception as e:
            return e

    async def add_appointment_details(self, appointment: Appointment):
        """
        Add a patient to the patients collection
        :param patient: Patient object
        :return: Created time of the record
        """
        try:
            resp = await self.appointments_collection.insert_one(appointment.model_dump())
            return 200, "Appointment details updated"
        except Exception as e:
            return 500, e