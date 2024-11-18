import os

from motor.motor_asyncio import AsyncIOMotorClient

from app.models.patient import Patient, Appointment
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

    async def add_patient(self, patient: Patient):
        """
        Add a patient to the patients collection
        :param patient: Patient object
        :return: Created time of the record
        """
        print("Jai shree ram")
        resp = await self.patient_collection.insert_one(patient.model_dump())
        print("JSR")
        created_time = await self.patient_collection.find_one({"id": resp.inserted_id})
        return created_time
    
    async def scheduleAppointment(self, email: str, appointmentDetails: Appointment):
        """
        Schedule an appointment for Patient
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


   
    


