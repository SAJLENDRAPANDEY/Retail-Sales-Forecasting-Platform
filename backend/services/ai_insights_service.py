from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()


def generate_ai_insights(analysis):

    api_key = os.getenv(
        "GROQ_API_KEY"
    )

    if not api_key:
        return """
        AI Insights unavailable.
        GROQ_API_KEY is not configured.
        """

    client = Groq(
        api_key=api_key
    )

    prompt = f"""
    Analyze this business dataset:

    Total Sales: {analysis.get('total_sales')}
    Average Sales: {analysis.get('avg_sales')}
    Top Category: {analysis.get('top_category')}
    Quality Score: {analysis.get('quality_score')}

    Generate:
    1. Executive Summary
    2. Key Findings
    3. Recommendations
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content