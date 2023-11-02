import pymongo
import sys

sys.path.append('/home/csguest/Downloads/capstone-backend-revised/backend')

from utils import connect


client = connect()
db = client['Next_Step_Readiness']
print(db['Questions'])