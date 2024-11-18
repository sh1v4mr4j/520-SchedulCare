import os

from motor.motor_asyncio import AsyncIOMotorClient

from app.models.doctor import Doctor
from app.shared.mongo_utils import serialize_mongo_object



class DoctorService:
    def __init__(self):
        self.uri = os.getenv("MONGO_URI")
        self.client = AsyncIOMotorClient(self.uri)

        # Keep the database and collection as instance variables
        self.database = self.client["schedulcare"]

        # Patients collection
        self.doctor_collection = self.database["doctors"]

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

    async def get_all_doctors(self):
        """
        Get all the patients from the patients collection
        """
        doctors = []
        async for patient in self.doctor_collection.find():
            doctors.append(patient)
        return [serialize_mongo_object(doctor_doc) for doctor_doc in doctors]

    async def add_doctor(self, doctor: Doctor):
        """
        Add a patient to the patients collection
        :param patient: Patient object
        :return: Created time of the record
        """
        print("Jai shree ram")
        resp = await self.doctor_collection.insert_one(doctor.model_dump())
        created_time = await self.doctor_collection.find_one({"id": resp.inserted_id})
        return created_time
