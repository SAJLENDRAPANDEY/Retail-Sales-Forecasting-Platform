from fastapi import APIRouter
from pydantic import BaseModel

from backend.services.forecasting import predict_sales

router = APIRouter()


class ForecastRequest(BaseModel):
    category: str
    region: str
    quantity: int
    month: int


@router.post("/predict")
def predict(data: ForecastRequest):

    prediction = predict_sales(
        data.category,
        data.region,
        data.quantity,
        data.month
    )

    return {
        "predicted_sales": prediction
    }