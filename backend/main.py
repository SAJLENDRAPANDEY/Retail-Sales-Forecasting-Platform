from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes.forecast_routes import router as forecast_router
from backend.routes.dashboard import router as dashboard_router
from backend.routes.analytics import router as analytics_router
from backend.routes.sales_trend import router as sales_trend_router
from backend.routes.category_chart import router as category_router
from backend.routes.region_chart import router as region_router
from backend.routes.auth import router as auth_router
from backend.routes.reports import router as reports_router
from backend.routes.upload_routes import router as upload_router
from backend.routes.history import (router as history_router)




app = FastAPI(
    title="Retail Sales Forecasting API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(forecast_router)
app.include_router(dashboard_router)
app.include_router(analytics_router)
app.include_router(sales_trend_router)
app.include_router(category_router)
app.include_router(region_router)
app.include_router(auth_router)
app.include_router(reports_router)
app.include_router(upload_router)
app.include_router(history_router)

@app.get("/")
def home():
    return {
        "message": "Retail Sales Forecasting API Running"
    }