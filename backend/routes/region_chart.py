from fastapi import APIRouter
from sqlalchemy import func

from backend.database.connection import SessionLocal
from backend.database.models import Sales

router = APIRouter()


@router.get("/region-sales")
def region_sales():

    db = SessionLocal()

    result = (
        db.query(
            Sales.region,
            func.sum(Sales.sales)
        )
        .group_by(Sales.region)
        .all()
    )

    db.close()

    return [
        {
            "region": row[0],
            "sales": round(row[1], 2)
        }
        for row in result
    ]