from backend.routes.upload_routes import latest_analysis


def get_dashboard_data():

    global latest_analysis

    if latest_analysis is None:
        return {
            "success": False,
            "error": "No analysis available"
        }

    return {
        "total_sales": latest_analysis.get(
            "total_sales", 0
        ),
        "total_orders": latest_analysis.get(
            "total_orders", 0
        ),
        "total_rows": latest_analysis.get(
            "total_rows", 0
        )
    }


def get_analytics_data():

    global latest_analysis

    if latest_analysis is None:
        return {
            "success": False,
            "error": "No analysis available"
        }

    return {

        "total_sales":
        latest_analysis.get(
            "total_sales", 0
        ),

        "avg_sales":
        latest_analysis.get(
            "avg_sales", 0
        ),

        "total_orders":
        latest_analysis.get(
            "total_orders", 0
        ),

        "total_rows":
        latest_analysis.get(
            "total_rows", 0
        ),

        "total_columns":
        latest_analysis.get(
            "total_columns", 0
        ),

        "missing_values":
        latest_analysis.get(
            "missing_values", 0
        ),

        "duplicate_rows":
        latest_analysis.get(
            "duplicate_rows", 0
        ),

        "quality_score":
        latest_analysis.get(
            "quality_score", 100
        ),

        "top_category":
        latest_analysis.get(
            "top_category", "N/A"
        ),

        "top_category_sales":
        latest_analysis.get(
            "top_category_sales", 0
        ),

        "highest_sale":
        latest_analysis.get(
            "highest_sale", 0
        ),

        "lowest_sale":
        latest_analysis.get(
            "lowest_sale", 0
        ),

        "selected_sales_column":
        latest_analysis.get(
            "selected_sales_column",
            ""
        ),

        "selected_category_column":
        latest_analysis.get(
            "selected_category_column",
            ""
        ),

        "category_chart":
        latest_analysis.get(
            "category_chart",
            []
        )
    }


def get_top_products():

    global latest_analysis

    if latest_analysis is None:
        return []

    return []