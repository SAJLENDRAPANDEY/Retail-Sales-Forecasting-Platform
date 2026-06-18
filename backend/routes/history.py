from fastapi import APIRouter

from backend.database.history_db import (
    get_upload_history,
    delete_history
)

router = APIRouter()


@router.get("/upload-history")
def upload_history():

    history = get_upload_history()

    result = []

    for row in history:

        result.append({

            "id": row[0],

            "filename": row[1],

            "rows": row[2],

            "columns": row[3],

            "upload_time": row[4]

        })

    return result


@router.delete(
    "/upload-history/{history_id}"
)
def remove_history(
    history_id: int
):

    delete_history(
        history_id
    )

    return {

        "message":
        "History deleted successfully"

    }