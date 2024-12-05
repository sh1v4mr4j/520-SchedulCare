import os

from motor.motor_asyncio import AsyncIOMotorClient

from app.models.doctor import Doctor
from app.shared.mongo_utils import serialize_mongo_object
from app.models.location import Location
from app.tests.mock import mock_doctor
from app.models.login import Login
from passlib.context import CryptContext
import bcrypt

from app.services.mfa_service import MFAService

mfa_service = MFAService()

class DoctorService:
    def __init__(self):
        self.uri = os.getenv("MONGO_URI")
        self.client = AsyncIOMotorClient(self.uri)

        # Keep the database and collection as instance variables
        self.database = self.client["schedulcare"]

        # Patients collection
        self.doctor_collection = self.database["doctors"]
        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

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
        # Check if the patient already exists in the database
        existing_doctor = await self.doctor_collection.find_one({"email": doctor.email})
        if existing_doctor:
            return 400, "Doctor already registered"

        # Hash the password before storing it
        hashed_password = bcrypt.hashpw(doctor.password.encode('utf-8'), bcrypt.gensalt())
        doctor.password = hashed_password

        secret = mfa_service.generate_mfa_secret()
        doctor.secret = secret

        # Return the response with a success message and QR code
        resp = await self.doctor_collection.insert_one(doctor.model_dump())
        return 200, 'Doctor added successfully'
    
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
    
    async def set_location_for_doctor(self, doctor_email: str, address: Location):
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

    async def login_doctor(self, login: Login):
        """
        Login a doctor with email and password.
        """
        # Retrieve the doctor data based on the provided email
        doctor = await self.doctor_collection.find_one({"email": login.email})
        
        # If the doctor does not exist, raise an exception to prompt the user to register
        if not doctor:
            return 401, "Invalid Credentials"
        
        # Verify if the provided password matches the stored hashed password
        if not self.pwd_context.verify(login.password, doctor["password"]):
            return 401, "Invalid Credentials"
        
        # If authentication is successful, return a success response
        return 200, "Login successful"
