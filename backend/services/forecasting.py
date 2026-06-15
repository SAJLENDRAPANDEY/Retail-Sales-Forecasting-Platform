import joblib
import pandas as pd
import numpy as np

model = joblib.load("ml/model.pkl")


def predict_sales(category, region, quantity, month):

    sample = pd.DataFrame({
        "lag_1": [50000],
        "lag_2": [47000],
        "lag_3": [45000],
        "lag_6": [43000],
        "lag_12": [40000],
        "rolling_mean_3": [47333],
        "rolling_mean_6": [46000],
        "rolling_mean_12": [42000],
        "rolling_std_3": [2500],
        "sales_growth": [0.08],
        "Month": [month],
        "Quarter": [(month - 1)//3 + 1],
        "Year": [2026],
        "month_sin": [np.sin(2*np.pi*month/12)],
        "month_cos": [np.cos(2*np.pi*month/12)]
    })

    prediction = model.predict(sample)

    return round(float(prediction[0]), 2)