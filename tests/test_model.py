import joblib
import pandas as pd
import numpy as np


def test_model_prediction():

    model = joblib.load("ml/model.pkl")

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

        "Month": [7],
        "Quarter": [3],
        "Year": [2026],

        "month_sin": [np.sin(2*np.pi*7/12)],
        "month_cos": [np.cos(2*np.pi*7/12)]
    })

    prediction = model.predict(sample)

    assert prediction[0] > 0



# ml workflow start 