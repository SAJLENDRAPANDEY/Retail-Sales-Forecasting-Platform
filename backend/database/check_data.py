from backend.database.connection import SessionLocal
from backend.database.models import Sales

db = SessionLocal()

count = db.query(Sales).count()

print("Total Rows:", count)

db.close()


