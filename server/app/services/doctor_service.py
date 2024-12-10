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
from app.models.doctor import DoctorSchedule

class DoctorService:
    def __init__(self):
        # Initialize the DoctorService with MongoDB connection
        # Get MongoDB URI from environment variables
        self.uri = os.getenv("MONGO_URI")
        self.client = AsyncIOMotorClient(self.uri)
        
        print("connecting to", self.uri)

        # Keep the database and collection as instance variables
        # Access the 'schedulcare' database
        self.database = self.client["schedulcare"]

        # Patients collection
        self.doctor_collection = self.database["doctors"]
        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        self.schedule_collection = self.database["doctorschedule"]

        # Availability collection
        self.availability_collection = self.database["doctorschedule"]

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
            doctors = []
            async for doctor in self.doctor_collection.find({"pincode": pincode}):
                doctors.append(doctor)
            return 200, [serialize_mongo_object(doctor_doc) for doctor_doc in doctors]
        except Exception as e:
            return 404, "Doctor not found" 
    
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
        return 200, serialize_mongo_object(doctor)
    
    async def get_doctor_by_email(self, email: str):
        """
        Fetch a doctor's details by email.

        Args:
            email (str): The email of the doctor.

        Returns:
            dict: A dictionary containing the doctor's details or None if not found.
        """
        try:
            doctor = await self.doctor_collection.find_one({"email": {"$eq": email}})
            if doctor:
                return 200, {
                    "name": doctor["name"],
                    "email": doctor["email"],
                    "specialisation": doctor.get("specialisation"),
                    "pincode": doctor.get("pincode")
                }
            
        except Exception as e:
            return 500, e
    
    async def save_availability(self, availability: DoctorSchedule):
        """
        Save a doctor's availability to the database.

        Args:
            availability (DoctorSchedule): The availability object to save.

        Returns:
            The saved availability object or an error message.
        """
        try:
            # Check if availability already exists for the doctor
            existing_availability = await self.availability_collection.find_one({"doctor_email": availability.doctor_email})
            print(f"Existing availability for {availability.doctor_email}: {existing_availability}")  # Debugging line

            if existing_availability:
                # Update the existing availability 
                await self.availability_collection.update_one(
                    {"doctor_email": availability.doctor_email},
                    {"$set": availability.dict()}
                )
                return 200, "Availability saved successfully"  # Return updated availability
            else:
                # Logic to save new availability in the database
                await self.availability_collection.insert_one(availability.dict())
                return 200, "Availability saved successfully"  # Return newly created availability
        except Exception as e:
            return 500, e
        
    async def get_schedule_by_email(self,email:str):
        """
        Send the doctor schedule
        """
        try:
            doctor_schedule = await self.schedule_collection.find_one({"doctor_email": email})
            if not doctor_schedule:
                return 404, "No schedule available"
            
            if doctor_schedule and "_id" in doctor_schedule:
                doctor_schedule["_id"] = str(doctor_schedule["_id"])
            return 200, doctor_schedule
        except Exception as e:
            return 500, {"error": f"An error occurred: {str(e)}"}