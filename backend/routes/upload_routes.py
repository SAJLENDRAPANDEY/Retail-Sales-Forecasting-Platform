

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Body
)

from backend.database.history_db import (
    save_upload_history
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

uploaded_df = None
latest_analysis = None


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

        # Save history
        save_upload_history(
            file.filename,
            len(uploaded_df),
            len(uploaded_df.columns)
        )

        return {

            "success": True,

            "columns": list(
                uploaded_df.columns
            ),

            "rows": len(
                uploaded_df
            ),

            "preview": uploaded_df.head(10)
            .fillna("")
            .to_dict(
                orient="records"
            )

        }

    except Exception as e:

        return {

            "success": False,

            "error": str(e)

        }


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

        print("ANALYSIS RESULT:")
        print(result)

        latest_analysis = result

        return result

    except Exception as e:

        return {

            "success": False,

            "error": str(e)

        }


@router.post("/download-upload-report")
async def download_report(
    analysis: dict = Body(...)
):

    try:

        file_path = generate_uploaded_report(
            analysis
        )

        return FileResponse(

            path=file_path,

            filename="uploaded_analysis.pdf",

            media_type="application/pdf"

        )

    except Exception as e:

        return {

            "success": False,

            "error": str(e)

        }