import unittest
from unittest.mock import AsyncMock, MagicMock, patch
from app.services.doctor_service import DoctorService
from app.models.doctor import Doctor
from app.models.location import Location
from app.models.login import Login
from app.models.doctor import DoctorSchedule
from app.shared.mongo_utils import serialize_mongo_object

class TestDoctorService(unittest.IsolatedAsyncioTestCase):

    def setUp(self):
        # Create an instance of the DoctorService class for testing
        self.doctor_service = DoctorService()

    @patch('app.services.doctor_service.AsyncIOMotorClient')
    async def test_add_doctor_success(self, mock_client):
        # Create a mock doctor
        mock_doctor = Doctor(name="Dr. Test", email="test@doctor.com", password="password123", pincode=12345, specialisation="Cardiology", dob="1987-08-02", gender="Male")
        
        #Mock call for find_one
        self.doctor_service.doctor_collection.find_one = AsyncMock(return_value=None)
        
        # Mock the database call for insert_one
        self.doctor_service.doctor_collection.insert_one = AsyncMock(return_value=AsyncMock(inserted_id=123))
        
        status_code, message = await self.doctor_service.add_doctor(mock_doctor)
        self.assertEqual(status_code, 200)
        self.assertEqual(message, 'Doctor added successfully')

    @patch('app.services.doctor_service.AsyncIOMotorClient')
    async def test_add_doctor_existing(self, mock_client):
        # Create a mock doctor
        mock_doctor = Doctor(name="Dr. Test", email="test@doctor.com", password="password123", pincode=12345, specialisation="Cardiology", dob="1987-08-02", gender="Male")
        
        # Mock the database call to find an existing doctor
        self.doctor_service.doctor_collection.find_one = AsyncMock(return_value={"email": "test@doctor.com"})
        
        status_code, message = await self.doctor_service.add_doctor(mock_doctor)
        self.assertEqual(status_code, 400)
        self.assertEqual(message, "Doctor already registered")

    @patch('app.services.doctor_service.AsyncIOMotorClient')
    async def test_get_all_doctors_success(self, mock_client):
        # Mock the doctor documents in the collection
        mock_doctors = [
            {"_id": "1", "name": "Dr. Test", "email": "test@doctor.com", "specialisation": "Cardiology", "pincode": 12345}
        ]
        
        # Mock the find() method to return list of doctors
        async def mock_find():
            for doctor in mock_doctors:
                yield doctor

        self.doctor_service.doctor_collection.find = mock_find
        
        # Call the method
        doctors = await self.doctor_service.get_all_doctors()
        
        # Verify the results
        expected_doctors = [serialize_mongo_object(doc) for doc in mock_doctors]
        self.assertEqual(doctors, expected_doctors)

    @patch('app.services.doctor_service.AsyncIOMotorClient')
    async def test_get_doctor_by_pincode_success(self, mock_client):
        # Mock doctor documents in the new format
        mock_doctors = [
            {"_id": "1", "name": "Dr. Test", "email": "test@doctor.com", "specialisation": "Cardiology", "pincode": 12345},
            {"_id": "2", "name": "Dr. Another", "email": "another@doctor.com", "specialisation": "Neurology", "pincode": 12345}
        ]
        
        # Mock the find() method to return an asynchronous iterable (simulating async iteration)
        async def mock_find(query):
            if query.get("pincode") == 12345:
                for doctor in mock_doctors:
                    yield doctor
            # Return empty if the pincode doesn't match
            else:
                yield []
        
        # Patch the find method of doctor_collection with mock_find
        self.doctor_service.doctor_collection.find = mock_find
        
        # Call the method with the pincode
        status_code, message = await self.doctor_service.get_doctor_by_pincode(12345)
        
        # Validate the success response
        self.assertEqual(status_code, 200)
        self.assertEqual(len(message), 2)  # There should be 2 doctors returned
        self.assertEqual(message[0]['name'], 'Dr. Test')  # Check the first doctor's name
        self.assertEqual(message[1]['name'], 'Dr. Another')  # Check the second doctor's name


if __name__ == '__main__':
    unittest.main()
