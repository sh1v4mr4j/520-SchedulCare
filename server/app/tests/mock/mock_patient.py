from app.models.patient import Patient

mock_patient: list[Patient] = [
  {
    "email": "patient1@example.com",
    "name": "Alice Johnson",
    "dob": "1990-02-14",
    "age": 34,
    "gender": "Female",
    "password": "hashed_password_1",
    "pincode": 12345,
    "appointments": [
      {
        "doctorName": "Dr. John Doe",
        "date": "2024-11-20",
        "time": "10:30 AM"
      }
    ]
  },
  {
    "email": "patient2@example.com",
    "name": "Bob Smith",
    "dob": "1985-08-30",
    "age": 38,
    "gender": "Male",
    "password": "hashed_password_2",
    "pincode": 67890,
    "appointments": [
      {
        "doctorName": "Dr. Jane Smith",
        "date": "2024-11-22",
        "time": "2:00 PM"
      },
      {
        "doctorName": "Dr. Robert Brown",
        "date": "2024-12-05",
        "time": "11:00 AM"
      }
    ]
  },
  {
    "email": "patient3@example.com",
    "name": "Charlie Davis",
    "dob": "2000-06-12",
    "age": 24,
    "gender": "Male",
    "password": "hashed_password_3",
    "pincode": 54321,
    "appointments": []
  },
  {
    "email": "patient4@example.com",
    "name": "Diana Moore",
    "dob": "1978-01-25",
    "age": 46,
    "gender": "Female",
    "password": "hashed_password_4",
    "pincode": 12345,
    "appointments": [
      {
        "doctorName": "Dr. Emily White",
        "date": "2024-11-28",
        "time": "1:30 PM"
      }
    ]
  },
  {
    "email": "patient5@example.com",
    "name": "Ethan Brown",
    "dob": "1995-09-10",
    "age": 29,
    "gender": "Male",
    "password": "hashed_password_5",
    "pincode": 67890,
    "appointments": [
      {
        "doctorName": "Dr. Sarah Taylor",
        "date": "2024-11-25",
        "time": "4:00 PM"
      }
    ]
  },
  {
    "email": "patient6@example.com",
    "name": "Fiona Clark",
    "dob": "1982-03-18",
    "age": 42,
    "gender": "Female",
    "password": "hashed_password_6",
    "pincode": 54321,
    "appointments": []
  },
  {
    "email": "patient7@example.com",
    "name": "George Hall",
    "dob": "1988-11-05",
    "age": 36,
    "gender": "Male",
    "password": "hashed_password_7",
    "pincode": 12345,
    "appointments": [
      {
        "doctorName": "Dr. Jessica Miller",
        "date": "2024-12-01",
        "time": "9:00 AM"
      }
    ]
  },
  {
    "email": "patient8@example.com",
    "name": "Hannah Wilson",
    "dob": "1999-07-22",
    "age": 25,
    "gender": "Female",
    "password": "hashed_password_8",
    "pincode": 67890,
    "appointments": []
  },
  {
    "email": "patient9@example.com",
    "name": "Ian Martinez",
    "dob": "1991-05-16",
    "age": 33,
    "gender": "Male",
    "password": "hashed_password_9",
    "pincode": 54321,
    "appointments": [
      {
        "doctorName": "Dr. William Wilson",
        "date": "2024-12-03",
        "time": "3:30 PM"
      }
    ]
  },
  {
    "email": "patient10@example.com",
    "name": "Julia Harris",
    "dob": "1983-02-11",
    "age": 41,
    "gender": "Female",
    "password": "hashed_password_10",
    "pincode": 12345,
    "appointments": []
  }
]
