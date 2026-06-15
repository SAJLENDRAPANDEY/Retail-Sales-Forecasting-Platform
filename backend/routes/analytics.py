from fastapi import APIRouter
from backend.services.insights import get_analytics_data
from backend.services.insights import get_top_products

router = APIRouter()

@router.get("/analytics")
def analytics():
    return get_analytics_data()

@router.get("/top-products")
def top_products():
    return get_top_products()