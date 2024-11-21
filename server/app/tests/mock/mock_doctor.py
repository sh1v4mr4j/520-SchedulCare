from app.models.doctor import Doctor

mock_doctor: list[Doctor] = [
    {
      "email": "doc1@example.com",
      "name": "Dr. John Doe",
      "specialisation": "Cardiology",
      "dob": "1980-01-01",
      "age": 43,
      "gender": "Male",
      "password": "hashed_password_1",
      "pincode": 11001,
      "availableDates": ["2024-11-18", "2024-11-19"]
    },
    {
      "email": "doc2@example.com",
      "name": "Dr. Jane Smith",
      "specialisation": "Dermatology",
      "dob": "1985-05-10",
      "age": 38,
      "gender": "Female",
      "password": "hashed_password_2",
      "pincode": 11001,
      "availableDates": ["2024-11-20", "2024-11-21"]
    },
    {
      "email": "doc3@example.com",
      "name": "Dr. Emily White",
      "specialisation": "Orthopedics",
      "dob": "1990-03-15",
      "age": 34,
      "gender": "Female",
      "password": "hashed_password_3",
      "pincode": 11001,
      "availableDates": ["2024-11-22"]
    },
    {
      "email": "doc4@example.com",
      "name": "Dr. Robert Brown",
      "specialisation": "Pediatrics",
      "dob": "1975-07-20",
      "age": 48,
      "gender": "Male",
      "password": "hashed_password_4",
      "pincode": 11002,
      "availableDates": ["2024-11-23", "2024-11-24"]
    },
    {
      "email": "doc5@example.com",
      "name": "Dr. Sarah Taylor",
      "specialisation": "Neurology",
      "dob": "1982-08-14",
      "age": 41,
      "gender": "Female",
      "password": "hashed_password_5",
      "pincode": 67890,
      "availableDates": ["2024-11-25"]
    },
    {
      "email": "doc6@example.com",
      "name": "Dr. Michael Clark",
      "specialisation": "General Medicine",
      "dob": "1993-11-30",
      "age": 30,
      "gender": "Male",
      "password": "hashed_password_6",
      "pincode": 54321,
      "availableDates": ["2024-11-26", "2024-11-27"]
    },
    {
      "email": "doc7@example.com",
      "name": "Dr. Jessica Miller",
      "specialisation": "Gastroenterology",
      "dob": "1987-12-22",
      "age": 36,
      "gender": "Female",
      "password": "hashed_password_7",
      "pincode": 67890,
      "availableDates": ["2024-11-28", "2024-11-29"]
    },
    {
      "email": "doc8@example.com",
      "name": "Dr. William Wilson",
      "specialisation": "Psychiatry",
      "dob": "1981-03-05",
      "age": 42,
      "gender": "Male",
      "password": "hashed_password_8",
      "pincode": 12345,
      "availableDates": ["2024-11-30"]
    },
    {
      "email": "doc9@example.com",
      "name": "Dr. Olivia Martinez",
      "specialisation": "Oncology",
      "dob": "1979-06-10",
      "age": 44,
      "gender": "Female",
      "password": "hashed_password_9",
      "pincode": 54321,
      "availableDates": ["2024-12-01", "2024-12-02"]
    },
    {
      "email": "doc10@example.com",
      "name": "Dr. Ethan Harris",
      "specialisation": "Endocrinology",
      "dob": "1986-09-17",
      "age": 37,
      "gender": "Male",
      "password": "hashed_password_10",
      "pincode": 67890,
      "availableDates": ["2024-12-03"]
    }
  ]