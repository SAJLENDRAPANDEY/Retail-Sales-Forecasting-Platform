import joblib
import pandas as pd

model=joblib.load(r"C:\Users\SAJLE\Downloads\Super store sales\ml\model.pkl")

print("Model load successfully")




# Load model


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
    "month_sin": [-0.5],
    "month_cos": [-0.86]
})

prediction = model.predict(sample)

print(f"Predicted Sales: ₹{prediction[0]:,.2f}")