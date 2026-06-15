from sqlalchemy import func

from backend.database.connection import SessionLocal
from backend.database.models import Sales


def get_dashboard_data():

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

    db.close()

    return {
        "total_sales": round(total_sales, 2),
        "total_orders": total_orders,
        "total_products": total_products
    }


def get_analytics_data():

    db = SessionLocal()

    best_product = (
        db.query(
            Sales.product_name,
            func.sum(Sales.sales).label("total_sales")
        )
        .group_by(Sales.product_name)
        .order_by(func.sum(Sales.sales).desc())
        .first()
    )

    top_region = (
        db.query(
            Sales.region,
            func.sum(Sales.sales).label("total_sales")
        )
        .group_by(Sales.region)
        .order_by(func.sum(Sales.sales).desc())
        .first()
    )

    top_category = (
        db.query(
            Sales.category,
            func.sum(Sales.sales).label("total_sales")
        )
        .group_by(Sales.category)
        .order_by(func.sum(Sales.sales).desc())
        .first()
    )

    db.close()

    return {
        "best_product": best_product[0],
        "top_region": top_region[0],
        "top_category": top_category[0]
    }

def get_sales_trend():

    db = SessionLocal()

    data = (
        db.query(
            Sales.order_date,
            Sales.sales
        )
        .all()
    )

    db.close()

    return data

def get_top_products():

    db = SessionLocal()

    products = (
        db.query(
            Sales.product_name,
            func.sum(Sales.sales).label("total_sales")
        )
        .group_by(Sales.product_name)
        .order_by(func.sum(Sales.sales).desc())
        .limit(10)
        .all()
    )

    db.close()

    return [
        {
            "product_name": p.product_name,
            "sales": round(p.total_sales, 2)
        }
        for p in products
    ]