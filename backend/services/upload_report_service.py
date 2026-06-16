from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import (
    getSampleStyleSheet
)


def generate_uploaded_report(
    analysis
):

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

    elements.append(

        Paragraph(
            "Uploaded Dataset Analysis Report",
            styles["Title"]
        )

    )

    elements.append(
        Spacer(1, 20)
    )

    elements.append(

        Paragraph(

            f"Total Sales : ₹{analysis['total_sales']}",

            styles["Normal"]

        )

    )

    doc.build(elements)

    return file_path