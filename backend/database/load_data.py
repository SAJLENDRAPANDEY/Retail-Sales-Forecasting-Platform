import pandas as pd

from backend.database.connection import SessionLocal
from backend.database.models import Sales

data = pd.read_excel(
    r"C:\Users\SAJLE\Downloads\Super store sales\data\dataset_superstore cleaned table.xlsx"
)

db = SessionLocal()

for _, row in data.iterrows():

    sale = Sales(
        order_id=str(row["Order ID"]),
        order_date=str(row["Order Date"]),   # ADD THIS

        category=str(row["Category"]),
        region=str(row["Region"]),

        product_name=str(row["Product Name"]),
        sales=float(row["Sales"])
    )

    db.add(sale)

db.commit()
db.close()

print("Data Loaded Successfully")