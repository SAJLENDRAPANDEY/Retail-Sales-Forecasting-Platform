from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

def _get_client():
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise RuntimeError(
            "GROQ_API_KEY environment variable is not set"
        )
    return Groq(api_key=api_key)

def generate_ai_insights(analysis):
    client = _get_client()

    prompt = f"""
    Analyze this business dataset summary.

    Total Sales: {analysis.get('total_sales')}
    Average Sales: {analysis.get('avg_sales')}
    Total Orders: {analysis.get('total_orders')}
    Top Category: {analysis.get('top_category')}
    Missing Values: {analysis.get('missing_values')}
    Duplicate Rows: {analysis.get('duplicate_rows')}
    Quality Score: {analysis.get('quality_score')}

    Generate:

    1. Executive Summary
    2. Key Findings
    3. Business Recommendations

    Keep response professional.
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