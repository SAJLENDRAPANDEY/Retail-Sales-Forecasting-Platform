from backend.utils.chart_generator import (
    generate_category_chart
)


def analyze_uploaded_data(
    df,
    sales_col,
    category_col
):

    total_sales = float(
        df[sales_col].sum()
    )

    category_chart = (
        generate_category_chart(
            df,
            sales_col,
            category_col
        )
    )

    return {

        "total_sales":
        total_sales,

        "category_chart":
        category_chart

    }