from backend.database.connection import engine
from backend.database.models import Base

print("Creating Database...")

Base.metadata.create_all(bind=engine)

print("Database Created Successfully")