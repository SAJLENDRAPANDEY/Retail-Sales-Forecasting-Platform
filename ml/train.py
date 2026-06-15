import pandas as pd
import numpy as np
import joblib
import mlflow
import mlflow.sklearn

from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor

from sklearn.metrics import (
    r2_score,
    mean_absolute_error,
    mean_squared_error
)

# =========================
# Load Data
# =========================

data = pd.read_csv(
    r"C:\Users\SAJLE\Downloads\Super store sales\data\monthly_sales_features.csv"
)

data["Order Date"] = pd.to_datetime(data["Order Date"])

data["Month"] = data["Order Date"].dt.month
data["Year"] = data["Order Date"].dt.year

data.drop("Order Date", axis=1, inplace=True)

# =========================
# Features & Target
# =========================

X = data[
    [
        "lag_1",
        "lag_2",
        "lag_3",
        "lag_6",
        "lag_12",
        "rolling_mean_3",
        "rolling_mean_6",
        "rolling_mean_12",
        "rolling_std_3",
        "sales_growth",
        "Month",
        "Quarter",
        "Year",
        "month_sin",
        "month_cos"
    ]
]

y = data["Sales"]

# =========================
# Time Series Split
# =========================

split_index = int(len(data) * 0.8)

X_train = X.iloc[:split_index]
X_test = X.iloc[split_index:]

y_train = y.iloc[:split_index]
y_test = y.iloc[split_index:]

# =========================
# Models
# =========================

models = {
    "Linear Regression": LinearRegression(),

    "Random Forest": RandomForestRegressor(
        n_estimators=200,
        random_state=42
    ),

    "XGBoost": XGBRegressor(
        n_estimators=50,
        max_depth=2,
        learning_rate=0.1,
        subsample=0.8,
        colsample_bytree=0.8,
        random_state=42
    )
}

# =========================
# MLflow
# =========================

mlflow.set_experiment(
    "Retail Sales Forecasting"
)

best_model = None
best_r2 = float("-inf")

for model_name, model in models.items():

    with mlflow.start_run(run_name=model_name):

        # Train
        model.fit(X_train, y_train)

        # Predict
        predictions = model.predict(X_test)

        # Metrics
        r2 = r2_score(
            y_test,
            predictions
        )

        mae = mean_absolute_error(
            y_test,
            predictions
        )

        rmse = np.sqrt(
            mean_squared_error(
                y_test,
                predictions
            )
        )

        # Print Results
        print("\n" + "=" * 50)
        print(f"Model : {model_name}")
        print(f"R2    : {r2:.4f}")
        print(f"MAE   : {mae:.4f}")
        print(f"RMSE  : {rmse:.4f}")

        # MLflow Logging
        mlflow.log_param(
            "model_name",
            model_name
        )

        mlflow.log_metric(
            "r2_score",
            r2
        )

        mlflow.log_metric(
            "mae",
            mae
        )

        mlflow.log_metric(
            "rmse",
            rmse
        )

        mlflow.sklearn.log_model(
            model,
            artifact_path="model"
        )

        # Best Model
        if r2 > best_r2:
            best_r2 = r2
            best_model = model

# =========================
# Save Best Model
# =========================

joblib.dump(
    best_model,
    r"C:\Users\SAJLE\Downloads\Super store sales\ml\model.pkl"
)

print("\nBest Model Saved Successfully!")
print(f"Best R2 Score: {best_r2:.4f}")