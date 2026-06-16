from fastapi import (
    APIRouter,
    UploadFile,
    File
)

from fastapi.responses import (
    FileResponse
)

import pandas as pd

from backend.schemas.upload_schema import (
    MappingRequest
)

from backend.services.upload_service import (
    analyze_uploaded_data
)

from backend.services.upload_report_service import (
    generate_uploaded_report
)

router = APIRouter()

# Global storage
uploaded_df = None
latest_analysis = None


# =========================
# Upload Excel
# =========================

@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...)
):

    global uploaded_df

    try:

        uploaded_df = pd.read_excel(
            file.file,
            engine="openpyxl"
        )

        return {

            "success": True,

            "columns": list(
                uploaded_df.columns
            ),

            "rows": len(
                uploaded_df
            )

        }

    except Exception as e:

        return {

            "success": False,

            "error": str(e)

        }


# =========================
# Analyze Uploaded Data
# =========================

@router.post("/analyze")
async def analyze(
    mapping: MappingRequest
):

    global uploaded_df
    global latest_analysis

    if uploaded_df is None:

        return {

            "success": False,

            "error":
            "No file uploaded"

        }

    try:

        result = analyze_uploaded_data(

            uploaded_df,

            mapping.sales,

            mapping.category

        )

        latest_analysis = result

        return result

    except Exception as e:

        return {

            "success": False,

            "error": str(e)

        }


# =========================
# Download PDF Report
# =========================

@router.get(
    "/download-upload-report"
)
async def download_report():

    global latest_analysis

    if latest_analysis is None:

        return {

            "success": False,

            "error":
            "No analysis available"

        }

    try:

        file_path = generate_uploaded_report(
            latest_analysis
        )

        return FileResponse(

            path=file_path,

            filename=
            "uploaded_analysis.pdf",

            media_type=
            "application/pdf"

        )

    except Exception as e:

        return {

            "success": False,

            "error": str(e)

        }