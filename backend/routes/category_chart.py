from fastapi import APIRouter
from sqlalchemy import func

from backend.database.connection import SessionLocal
from backend.database.models import Sales

router = APIRouter()


@router.get("/category-sales")
def category_sales():

    db = SessionLocal()

    result = (
        db.query(
            Sales.category,
            func.sum(Sales.sales)
        )
        .group_by(Sales.category)
        .all()
    )

    db.close()

    return [
        {
            "category": row[0],
            "sales": round(row[1], 2)
        }
        for row in result
    ]