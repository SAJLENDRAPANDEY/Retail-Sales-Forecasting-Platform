from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import (
    getSampleStyleSheet
)

import os


def generate_uploaded_report(
    analysis
):

    os.makedirs(
        "reports/pdf_reports",
        exist_ok=True
    )

    file_path = (
        "reports/pdf_reports/"
        "uploaded_analysis.pdf"
    )

    doc = SimpleDocTemplate(
        file_path
    )

    styles = (
        getSampleStyleSheet()
    )

    elements = []

    # Title

    elements.append(
        Paragraph(
            "Uploaded Dataset Analysis Report",
            styles["Title"]
        )
    )

    elements.append(
        Spacer(1, 20)
    )

    # Dataset Metrics

    elements.append(
        Paragraph(
            f"Total Sales : ₹{analysis.get('total_sales', 0)}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Average Sales : ₹{analysis.get('avg_sales', 0)}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Total Orders : {analysis.get('total_orders', 0)}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Total Rows : {analysis.get('total_rows', 0)}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Total Columns : {analysis.get('total_columns', 0)}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Missing Values : {analysis.get('missing_values', 0)}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Duplicate Rows : {analysis.get('duplicate_rows', 0)}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Top Category : {analysis.get('top_category', 'N/A')}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Top Category Sales : ₹{analysis.get('top_category_sales', 0)}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Highest Sale : ₹{analysis.get('highest_sale', 0)}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Lowest Sale : ₹{analysis.get('lowest_sale', 0)}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Quality Score : {analysis.get('quality_score', 100)}%",
            styles["Normal"]
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