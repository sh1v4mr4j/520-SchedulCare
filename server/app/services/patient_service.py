from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
from motor.motor_asyncio import AsyncIOMotorClient

from app.shared.mongo_utils import serialize_mongo_object

class PatientService:
    def __init__(self):
        self.uri = os.getenv("MONGO_URI")
        self.client = AsyncIOMotorClient(self.uri)

        # Keep the database and collection as instance variables
        self.database = self.client["schedulcare"]

        # Patients collection
        self.patient_collection = self.database["patients"]
    
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
    
    async def get_all_patients(self):
        """
        Get all the patients from the patients collection
        """
        patients = []
        async for patient in self.patient_collection.find():
            patients.append(patient)
        return [serialize_mongo_object(patient_doc) for patient_doc in patients]
