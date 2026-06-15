import pandas as pd
import numpy as np

# ==========================
# Load Dataset
# ==========================

data = pd.read_excel(
    r"C:\Users\SAJLE\Downloads\Super store sales\dataset_superstore cleaned table.xlsx"
)

# ==========================
# Data Cleaning
# ==========================

data["Postal Code"] = data["Postal Code"].astype(str)

data.loc[
    (data["City"] == "Burlington") &
    (data["State"] == "Vermont") &
    (data["Postal Code"].isna()),
    "Postal Code"
] = "05401"

# ==========================
# Date Formatting
# ==========================

data["Order Date"] = pd.to_datetime(data["Order Date"])

# Sort chronologically
data = data.sort_values("Order Date")

# ==========================
# Monthly Sales Aggregation
# ==========================

monthly_sales = (
    data.groupby(
        pd.Grouper(
            key="Order Date",
            freq="ME"
        )
    )["Sales"]
    .sum()
    .reset_index()
)

# ==========================
# Lag Features
# ==========================

monthly_sales["lag_1"] = monthly_sales["Sales"].shift(1)
monthly_sales["lag_2"] = monthly_sales["Sales"].shift(2)
monthly_sales["lag_3"] = monthly_sales["Sales"].shift(3)

monthly_sales["lag_6"] = monthly_sales["Sales"].shift(6)
monthly_sales["lag_12"] = monthly_sales["Sales"].shift(12)

# ==========================
# Rolling Features
# ==========================

monthly_sales["rolling_mean_3"] = (
    monthly_sales["Sales"]
    .shift(1)
    .rolling(window=3)
    .mean()
)

monthly_sales["rolling_std_3"] = (
    monthly_sales["Sales"]
    .shift(1)
    .rolling(window=3)
    .std()
)

monthly_sales["rolling_mean_6"] = (
    monthly_sales["Sales"]
    .shift(1)
    .rolling(window=6)
    .mean()
)

monthly_sales["rolling_mean_12"] = (
    monthly_sales["Sales"]
    .shift(1)
    .rolling(window=12)
    .mean()
)

# ==========================
# Growth Feature
# ==========================

monthly_sales["sales_growth"] = (
    monthly_sales["Sales"]
    .pct_change()
    .shift(1)
)

# ==========================
# Time Features
# ==========================

monthly_sales["Month"] = monthly_sales["Order Date"].dt.month
monthly_sales["Quarter"] = monthly_sales["Order Date"].dt.quarter
monthly_sales["Year"] = monthly_sales["Order Date"].dt.year

# ==========================
# Cyclical Features
# ==========================

monthly_sales["month_sin"] = np.sin(
    2 * np.pi * monthly_sales["Month"] / 12
)

monthly_sales["month_cos"] = np.cos(
    2 * np.pi * monthly_sales["Month"] / 12
)

# ==========================
# Drop Missing Values
# ==========================

monthly_sales.dropna(inplace=True)

# ==========================
# Save Feature Dataset
# ==========================

monthly_sales.to_csv(
    "monthly_sales_features.csv",
    index=False
)

# ==========================
# Summary
# ==========================

print("\nFeature Engineering Completed Successfully")
print("=" * 50)

print("Dataset Shape:", monthly_sales.shape)

print("\nColumns:")
print(monthly_sales.columns.tolist())

print("\nSample Data:")
print(monthly_sales.head())