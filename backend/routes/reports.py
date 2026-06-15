from fastapi import APIRouter
from fastapi.responses import FileResponse

from backend.services.report_generator import generate_excel_report
from backend.services.pdf_report_generator import generate_pdf_report

router = APIRouter()


@router.get("/download-excel")
def download_excel():

    generate_excel_report()

    return FileResponse(
        "reports/excel_reports/sales_report.xlsx",
        filename="sales_report.xlsx"
    )


@router.get("/download-pdf")
def download_pdf():

    pdf_path = generate_pdf_report()

    return FileResponse(
        path=pdf_path,
        filename="sales_report.pdf",
        media_type="application/pdf"
    )