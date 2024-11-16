from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
from motor.motor_asyncio import AsyncIOMotorClient

class PatientService:
    def __init__(self):
        self.uri = os.getenv("MONGO_URI")
        self.client = AsyncIOMotorClient(self.uri)
    # uri = "mongodb+srv://nikhilanand1006:<db_password>@animus.piv6r.mongodb.net/?retryWrites=true&w=majority&appName=Animus"

    # # Create a new client and connect to the server
    # client = MongoClient(uri, server_api=ServerApi('1'))

    # # Send a ping to confirm a successful connection
    # try:
    #     client.admin.command('ping')
    #     print("Pinged your deployment. You successfully connected to MongoDB!")
    # except Exception as e:
    #     print(e)

    def get_config():
        return os.getenv("MY_VAR")
    
    def ping_mongo(self):
        try:
            self.client.admin.command('ping')
            return "Pinged your deployment. You successfully connected to MongoDB!"
        except Exception as e:
            return e