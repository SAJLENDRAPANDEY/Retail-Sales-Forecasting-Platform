from pathlib import Path

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import getSampleStyleSheet

from sqlalchemy import func

from backend.database.connection import SessionLocal
from backend.database.models import Sales


def generate_pdf_report():

    db = SessionLocal()

    total_sales = db.query(
        func.sum(Sales.sales)
    ).scalar()

    total_orders = db.query(
        Sales.order_id
    ).distinct().count()

    total_products = db.query(
        Sales.product_name
    ).distinct().count()

    # Project Root
    BASE_DIR = Path(__file__).resolve().parents[2]

    # reports/pdf_reports folder
    pdf_dir = BASE_DIR / "reports" / "pdf_reports"

    pdf_dir.mkdir(
        parents=True,
        exist_ok=True
    )

    pdf_file = pdf_dir / "sales_report.pdf"

    print("PDF Saving To:", pdf_file)

    doc = SimpleDocTemplate(
        str(pdf_file)
    )

    styles = getSampleStyleSheet()

    elements = []

    elements.append(
        Paragraph(
            "Retail Sales Forecasting Report",
            styles["Title"]
        )
    )

    elements.append(
        Spacer(1, 20)
    )

    elements.append(
        Paragraph(
            f"Total Sales: ₹ {round(total_sales, 2)}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Total Orders: {total_orders}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Total Products: {total_products}",
            styles["Normal"]
        )
    )

    elements.append(
        Spacer(1, 20)
    )

    elements.append(
        Paragraph(
            "Report generated successfully from FastAPI Dashboard.",
            styles["Normal"]
        )
    )

    doc.build(elements)

    db.close()

    return str(pdf_file)