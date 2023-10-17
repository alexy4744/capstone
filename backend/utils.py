from pymongo import MongoClient

try:
    client = MongoClient('mongodb+srv://michniksamuel:Billing1@nextstepreadiness.imgnoha.mongodb.net/')
    # Attempt to access the database to confirm the connection
    db = client['Next_Step_Readiness']
    collection_names = db.list_collection_names()
    print(f"Connected to MongoDB. Collections: {collection_names}")
except Exception as e:
    print(f"Connection to MongoDB failed: {e}")
