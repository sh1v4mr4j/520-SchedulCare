from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
from motor.motor_asyncio import AsyncIOMotorClient

class PatientService:
    def __init__(self):
        self.uri = os.getenv("MONGO_URI")
        self.client = AsyncIOMotorClient(self.uri)

    def get_config():
        return os.getenv("MY_VAR")
    
    def ping_mongo(self):
        try:
            self.client.admin.command('ping')
            return "Pinged your deployment. You successfully connected to MongoDB!"
        except Exception as e:
            return e