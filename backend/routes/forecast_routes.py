from fastapi import APIRouter
from backend.routes.upload_routes import uploaded_df
import pandas as pd



router = APIRouter()


# ==========================
# Forecast Info
# ==========================

@router.get("/forecast-data")
async def forecast_data():

    if uploaded_df is None:
        return {
            "success": False,
            "error": "Upload dataset first"
        }

    sales_column = None

    possible_columns = [
        "Sales",
        "sales",
        "Revenue",
        "Amount",
        "Total Sales"
    ]

    for col in uploaded_df.columns:

        if col in possible_columns:
            sales_column = col
            break

    if sales_column is None:

        return {
            "success": False,
            "error": "Sales column not found"
        }

    return {
        "success": True,
        "sales_column": sales_column,
        "rows": len(uploaded_df)
    }


# ==========================
# Sales By Period
# ==========================

@router.get("/sales-by-period")
async def sales_by_period(
    year: int,
    month: int
):

    if uploaded_df is None:
        return {
            "success": False,
            "error": "Upload dataset first"
        }

    df = uploaded_df.copy()

    if "Order Date" not in df.columns:
        return {
            "success": False,
            "error": "Order Date column not found"
        }

    df["Order Date"] = pd.to_datetime(
        df["Order Date"]
    )

    filtered = df[
        (df["Order Date"].dt.year == year) &
        (df["Order Date"].dt.month == month)
    ]

    return {
        "success": True,
        "sales": float(
            filtered["Sales"].sum()
        ),
        "orders": len(filtered)
    }


# ==========================
# Monthly Sales Trend
# ==========================

@router.get("/monthly-sales-trend")
async def monthly_sales_trend():

    if uploaded_df is None:
        return {
            "success": False,
            "error": "Upload dataset first"
        }

    df = uploaded_df.copy()

    if "Order Date" not in df.columns:
        return {
            "success": False,
            "error": "Order Date column not found"
        }

    if "Sales" not in df.columns:
        return {
            "success": False,
            "error": "Sales column not found"
        }

    df["Order Date"] = pd.to_datetime(
        df["Order Date"]
    )

    monthly_sales = (
        df.groupby(
            df["Order Date"].dt.to_period("M")
        )["Sales"]
        .sum()
        .reset_index()
    )

    monthly_sales["Order Date"] = (
        monthly_sales["Order Date"]
        .astype(str)
    )

    return {
        "success": True,
        "data": monthly_sales.to_dict(
            orient="records"
        )
    }

from backend.routes.upload_routes import uploaded_df
import pandas as pd

@router.get("/forecast-years")
def get_forecast_years():

    global uploaded_df

    if uploaded_df is None:
        return {"years": []}

    df = uploaded_df.copy()

    df["Order Date"] = pd.to_datetime(
        df["Order Date"]
    )

    years = sorted(
        df["Order Date"]
        .dt.year
        .unique()
        .tolist()
    )

    return {
        "years": years
    }