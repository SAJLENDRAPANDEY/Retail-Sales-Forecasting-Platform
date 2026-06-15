from fastapi import APIRouter
from sqlalchemy import func

from backend.database.connection import SessionLocal
from backend.database.models import Sales

router = APIRouter()


@router.get("/sales-trend")
def sales_trend():

    db = SessionLocal()

    result = (
        db.query(
            func.substr(Sales.order_date, 1, 7).label("month"),
            func.sum(Sales.sales)
        )
        .group_by("month")
        .order_by("month")
        .all()
    )

    db.close()

    return [
        {
            "date": row[0],
            "sales": round(row[1], 2)
        }
        for row in result
    ]