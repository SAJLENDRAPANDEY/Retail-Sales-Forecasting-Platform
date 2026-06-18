import pandas as pd

from backend.utils.chart_generator import (
    generate_category_chart
)


def analyze_uploaded_data(
    df,
    sales_col,
    category_col
):
    # Validate Columns

    if sales_col not in df.columns:
        raise Exception(
            f"Sales column '{sales_col}' not found"
        )

    if category_col not in df.columns:
        raise Exception(
            f"Category column '{category_col}' not found"
        )

    # Dataset Summary

    total_rows = len(df)

    total_columns = len(df.columns)

    missing_values = int(
        df.isnull().sum().sum()
    )

    duplicate_rows = int(
        df.duplicated().sum()
    )

    quality_score = round(
        max(
            0,
            100 - (
                (
                    missing_values +
                    duplicate_rows
                ) / max(total_rows, 1)
            ) * 100
        ),
        2
    )

    # Clean Data

    df = df.copy()

    df = df.dropna(
        subset=[
            sales_col,
            category_col
        ]
    )

    # Convert Sales Column to Numeric

    df[sales_col] = (
        df[sales_col]
        .astype(str)
        .str.replace("₹", "", regex=False)
        .str.replace(",", "", regex=False)
        .str.strip()
    )

    df[sales_col] = pd.to_numeric(
        df[sales_col],
        errors="coerce"
    )

    df = df.dropna(
        subset=[sales_col]
    )

    # KPI Metrics

    total_sales = round(
        float(
            df[sales_col].sum()
        ),
        2
    )

    avg_sales = round(
        float(
            df[sales_col].mean()
        ),
        2
    )

    total_orders = int(
        len(df)
    )

    highest_sale = round(
        float(
            df[sales_col].max()
        ),
        2
    )

    lowest_sale = round(
        float(
            df[sales_col].min()
        ),
        2
    )

    # Category Analysis

    category_sales = (
        df.groupby(category_col)[sales_col]
        .sum()
        .sort_values(
            ascending=False
        )
    )

    if len(category_sales) > 0:
        top_category = str(
            category_sales.idxmax()
        )

        top_category_sales = round(
            float(
                category_sales.max()
            ),
            2
        )
    else:
        top_category = "N/A"
        top_category_sales = 0

    # Charts

    category_chart = (
        generate_category_chart(
            df,
            sales_col,
            category_col
        )
    )

    # Debug Logs

    print("\n========== ANALYSIS RESULT ==========")

    print(
        "Total Sales:",
        total_sales
    )

    print(
        "Highest Sale:",
        highest_sale
    )

    print(
        "Lowest Sale:",
        lowest_sale
    )

    print(
        "Top Category:",
        top_category
    )

    print(
        "Top Category Sales:",
        top_category_sales
    )

    print(
        "Quality Score:",
        quality_score
    )

    print("====================================\n")

    return {
        "total_sales": total_sales,
        "avg_sales": avg_sales,
        "total_orders": total_orders,

        "total_rows": total_rows,
        "total_columns": total_columns,

        "missing_values": missing_values,
        "duplicate_rows": duplicate_rows,

        "quality_score": quality_score,

        "top_category": top_category,
        "top_category_sales": top_category_sales,

        "highest_sale": highest_sale,
        "lowest_sale": lowest_sale,

        "selected_sales_column": sales_col,
        "selected_category_column": category_col,

        "category_chart": category_chart
    }