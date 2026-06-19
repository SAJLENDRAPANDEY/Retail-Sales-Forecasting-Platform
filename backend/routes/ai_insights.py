from fastapi import APIRouter
from fastapi import Body

from backend.services.ai_insights_service import (
    generate_ai_insights
)

router = APIRouter()

@router.post("/generate-ai-insights")
def ai_insights(
    analysis: dict = Body(...)
):

    insights = generate_ai_insights(
        analysis
    )

    return {
        "insights": insights
    }