import os

from motor.motor_asyncio import AsyncIOMotorClient

from app.models.patient import Patient, Appointment
from app.shared.mongo_utils import serialize_mongo_object
from app.models.location import Location
from app.models.login import Login
from passlib.context import CryptContext
from app.services.mfa_service import MFAService

import bcrypt

mfa_service = MFAService()

class PatientService:

    def __init__(self):
        self.uri = os.getenv("MONGO_URI")
        print('uri', self.uri)
        self.client = AsyncIOMotorClient(self.uri)

        # Keep the database and collection as instance variables
        self.database = self.client["schedulcare"]

        # Patients collection
        self.patient_collection = self.database["patients"]

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

    async def get_all_patients(self):
        """
        Get all the patients from the patients collection
        """
        patients = []
        async for patient in self.patient_collection.find():
            patients.append(patient)
        return [serialize_mongo_object(patient_doc) for patient_doc in patients]

    async def add_patient(self, patient: Patient):
        """
        Add a patient to the patients collection
        :param patient: Patient object
        :return: Created time of the record
        """
        # Check if the patient already exists in the database
        existing_patient = await self.patient_collection.find_one({"email": patient.email})
        if existing_patient:
            return 400, serialize_mongo_object(existing_patient)

        # Hash the password before storing it
        hashed_password = bcrypt.hashpw(patient.password.encode('utf-8'), bcrypt.gensalt())
        patient.password = hashed_password.decode('utf-8')

        secret = mfa_service.generate_mfa_secret()
        patient.secret = secret

        # Create the patient data to insert into the collection
        patient_data = patient.model_dump()

        # Add the patient to the database
        resp = await self.patient_collection.insert_one(patient_data)

        new_patient = await self.patient_collection.find_one({"email": patient.email})

        #return 200, 'Patient added successfully'
        return 200, serialize_mongo_object(new_patient)
    
    async def scheduleAppointment(self, email: str, appointmentDetails: Appointment):
        """
      z  Schedule an appointment for Patient
        """
        patient = await self.patient_collection.find_one({"email": email})
        if not patient:
            return 404, "user not found"
        updated_appointments = patient.get("currentAppointment", [])
        updated_appointments.append((appointmentDetails.doctor_name, appointmentDetails.appointment_date, appointmentDetails.doctor_email, appointmentDetails.patient_email))

        result = await self.patient_collection.update_one(
            {"email": email},
            {"$set": {"currentAppointment": updated_appointments}}
        )
        if result.matched_count == 0:
            return 404, "Failed to update appointment"
        response = {"message": "Appointment updated successfully", "currentAppointment": updated_appointments}
        return 201, response
    
    async def set_location_for_patient(self, patient_email: str, address: Location):
        """
        Set the address for a doctor
        :param doctor_email: Email of the doctor
        :param address: Address of the doctor
        :return: Updated time of the record
        """
        try:
            patient_object = await self.patient_collection.find_one({"email": {"$eq": patient_email}})
            if not patient_object:
                return 404, "Doctor not found"
            resp = await self.patient_collection.update_one({"email": patient_email}, {"$set": {"location": address.model_dump()}})
            print(resp)
            return 200, "Address updated successfully"
        except Exception as e:
            return 500, e
        
    async def get_patient_by_email(self, email:str):
        """
        Gets the patient data from DB

        email: email of the patient
        """
        try:
            patient_data = await self.patient_collection.find_one({"email": email})
            if not patient_data:
                return 404, "Patient not found"
            return 200, serialize_mongo_object(patient_data)
        except Exception as e:
            return 500, e

    async def login_patient(self, login: Login):
        """
        Login a patient with email and password.
        """
        # Retrieve the patient data based on the provided email
        patient = await self.patient_collection.find_one({"email": login.email})
        
        # If the patient does not exist, raise an exception to prompt the user to register
        if not patient:
            return 401, "Invalid Credentials"
        
        # Verify if the provided password matches the stored hashed password
        if not self.pwd_context.verify(login.password, patient["password"]):
            return 401, "Invalid Credentials"
        
        # If authentication is successful, return a success response
        return 200, serialize_mongo_object(patient)

#Discuss placement
    async def verify_patient_otp(self, email: str, otp: str):
        """
        Verify the OTP for a patient.
        """
        patient = await self.patient_collection.find_one({"email": email})
        if not patient:
            return 401, "Invalid Credentials"
        
        if self.otp_service.verify_otp(patient["otp_secret"], otp):
            return 200, "OTP Verified"
        else:
            return 403, "Invalid OTP"
    


