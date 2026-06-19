from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    PageBreak
)

from reportlab.lib.styles import (
    getSampleStyleSheet
)

from reportlab.lib import colors

import os
from datetime import datetime


def generate_uploaded_report(analysis):

    os.makedirs(
        "reports/pdf_reports",
        exist_ok=True
    )

    file_path = (
        "reports/pdf_reports/"
        "uploaded_analysis.pdf"
    )

    doc = SimpleDocTemplate(file_path)

    styles = getSampleStyleSheet()

    elements = []

    # ---------------------------
    # Title Page
    # ---------------------------

    elements.append(
        Paragraph(
            "Retail Sales Forecasting Platform",
            styles["Title"]
        )
    )

    elements.append(
        Paragraph(
            "Dataset Analysis Report",
            styles["Heading2"]
        )
    )

    elements.append(
        Spacer(1, 20)
    )

    elements.append(
        Paragraph(
            f"Generated On: {datetime.now().strftime('%d %B %Y %H:%M')}",
            styles["Normal"]
        )
    )

    elements.append(
        Spacer(1, 40)
    )

    elements.append(
        Paragraph(
            "Prepared by: Retail Sales Forecasting Platform",
            styles["Normal"]
        )
    )

    elements.append(PageBreak())

    # ---------------------------
    # Executive Summary
    # ---------------------------

    total_sales = analysis.get(
        "total_sales", 0
    )

    avg_sales = analysis.get(
        "avg_sales", 0
    )

    total_orders = analysis.get(
        "total_orders", 0
    )

    quality_score = analysis.get(
        "quality_score", 100
    )

    top_category = analysis.get(
        "top_category", "N/A"
    )

    summary = f"""
    This dataset contains {total_orders} records.
    Total sales amount to ₹{total_sales:,.2f}
    with an average sales value of ₹{avg_sales:,.2f}.
    The highest-performing category is
    <b>{top_category}</b>.

    Dataset quality score is
    <b>{quality_score}%</b>,
    indicating the reliability of the dataset
    for business analysis and forecasting.
    """

    elements.append(
        Paragraph(
            "Executive Summary",
            styles["Heading1"]
        )
    )

    elements.append(
        Paragraph(
            summary,
            styles["BodyText"]
        )
    )

    elements.append(
        Spacer(1, 20)
    )

    # ---------------------------
    # KPI Metrics
    # ---------------------------

    elements.append(
        Paragraph(
            "Key Performance Indicators",
            styles["Heading1"]
        )
    )

    metrics = [
        f"Total Sales : ₹{analysis.get('total_sales', 0):,.2f}",
        f"Average Sales : ₹{analysis.get('avg_sales', 0):,.2f}",
        f"Total Orders : {analysis.get('total_orders', 0)}",
        f"Total Rows : {analysis.get('total_rows', 0)}",
        f"Total Columns : {analysis.get('total_columns', 0)}",
        f"Top Category : {analysis.get('top_category', 'N/A')}",
        f"Top Category Sales : ₹{analysis.get('top_category_sales', 0):,.2f}",
        f"Highest Sale : ₹{analysis.get('highest_sale', 0):,.2f}",
        f"Lowest Sale : ₹{analysis.get('lowest_sale', 0):,.2f}"
    ]

    for metric in metrics:
        elements.append(
            Paragraph(
                metric,
                styles["Normal"]
            )
        )

    elements.append(
        Spacer(1, 20)
    )

    # ---------------------------
    # Data Quality Section
    # ---------------------------

    elements.append(
        Paragraph(
            "Dataset Quality Assessment",
            styles["Heading1"]
        )
    )

    quality_report = f"""
    Missing Values : {analysis.get('missing_values', 0)} <br/>
    Duplicate Rows : {analysis.get('duplicate_rows', 0)} <br/>
    Quality Score : {analysis.get('quality_score', 100)}%
    """

    elements.append(
        Paragraph(
            quality_report,
            styles["BodyText"]
        )
    )

    elements.append(
        Spacer(1, 20)
    )

    # ---------------------------
    # Business Recommendations
    # ---------------------------

    elements.append(
        Paragraph(
            "Business Recommendations",
            styles["Heading1"]
        )
    )

    recommendations = """
    • Focus marketing efforts on the top-performing category.<br/>
    • Monitor low-performing sales segments regularly.<br/>
    • Maintain current data quality standards.<br/>
    • Use forecasting models for future demand planning.<br/>
    • Track monthly sales trends for strategic decisions.
    """

    elements.append(
        Paragraph(
            recommendations,
            styles["BodyText"]
        )
    )

    elements.append(
        Spacer(1, 20)
    )

    # ---------------------------
    # AI Insights Section
    # ---------------------------

    elements.append(
        Paragraph(
            "AI Generated Insights",
            styles["Heading1"]
        )
    )

    elements.append(
        Paragraph(
            analysis.get(
                "ai_insights",
                "AI insights have not been generated yet."
            ),
            styles["BodyText"]
        )
    )

    elements.append(
        Spacer(1, 20)
    )

    # ---------------------------
    # Dataset Mapping
    # ---------------------------

    elements.append(
        Paragraph(
            "Dataset Configuration",
            styles["Heading1"]
        )
    )

    elements.append(
        Paragraph(
            f"Sales Column : {analysis.get('selected_sales_column', '')}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Category Column : {analysis.get('selected_category_column', '')}",
            styles["Normal"]
        )
    )

    doc.build(elements)

    return file_path