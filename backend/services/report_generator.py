import pandas as pd

from backend.database.connection import SessionLocal
from backend.database.models import Sales


def generate_excel_report():

    db = SessionLocal()

    data = db.query(Sales).all()

    rows = []

    for row in data:

        rows.append({
            "Order ID": row.order_id,
            "Category": row.category,
            "Region": row.region,
            "Sales": row.sales
        })

    df = pd.DataFrame(rows)

    df.to_excel(
        "reports/excel_reports/sales_report.xlsx",
        index=False
    )

    db.close()