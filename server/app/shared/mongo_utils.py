def serialize_mongo_object(doc: dict) -> dict:
    """
    Serialize the MongoDB object to a dictionary
    """
    if "_id" in doc:
        # Convert the ObjectId to a string
        doc["id"] = str(doc["_id"])
        # Remove the ObjectId so that pydantic can serialize it
        del doc["_id"]
    return doc