import os

from motor.motor_asyncio import AsyncIOMotorClient

from app.models.doctor import Doctor
from app.shared.mongo_utils import serialize_mongo_object
from app.models.location import Location
from app.tests.mock import mock_doctor

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
        resp = await self.doctor_collection.insert_one(doctor.model_dump())
        created_time = await self.doctor_collection.find_one({"id": resp.inserted_id})
        return created_time
    
    async def get_doctor_by_pincode(self, pincode: int):
        """
        Gets all doctor in the given area (pincode)
        """
        try:
            doctors = await self.doctor_collection.find({"pincode": {"$eq": pincode}}).to_list(length=10)
            return 200, doctors
        except:
            get_doctor_by_pincode = [doctor for doctor in mock_doctor if doctor["pincode"] == pincode]
            return 200, get_doctor_by_pincode
    
    async def set_address_for_doctor(self, doctor_email: str, address: Location):
        """
        Set the address for a doctor
        :param doctor_email: Email of the doctor
        :param address: Address of the doctor
        :return: Updated time of the record
        """
        try:
            doc_obj = await self.doctor_collection.find_one({"email": {"$eq": doctor_email}})
            if not doc_obj:
                return 404, "Doctor not found"
            resp = await self.doctor_collection.update_one({"email": doctor_email}, {"$set": {"location": address.model_dump()}})
            print(resp)
            return 200, "Address updated successfully"
        except Exception as e:
            return 500, e
