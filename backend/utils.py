from pymongo import MongoClient

def connect(connection_string='mongodb+srv://michniksamuel:Billing1@nextstepreadiness.imgnoha.mongodb.net/'):
    try:
        client = MongoClient(connection_string)
        # Attempt to access the database to confirm the connection
        #db = client['Next_Step_Readiness']
        #collection_names = db.list_collection_names()
        print(f"Connected to MongoDB.")
    except Exception as e:
        print(f"Connection to MongoDB failed: {e}")

    return client


