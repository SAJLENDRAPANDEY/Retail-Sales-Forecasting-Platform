import pandas as pd
data=pd.read_excel(r"C:\Users\SAJLE\Downloads\Super store sales\dataset_superstore cleaned table.xlsx")

# check null values

# print(data.isnull().sum())

# print(data[data["Postal Code"].isna()])

# print(data[data["Postal Code"].isnull()][["City","State","Postal Code"]])


data["Postal Code"]=data["Postal Code"].astype("str")

data.loc[
    (data["City"]=="Burlington") &
    (data["State"]=="Vermont") &
    (data["Postal Code"].isna()),
    "Postal Code"
] = "05401"


# print(data.duplicated().sum())


# print(data.isnull().sum())

# print(data.head())


# month extract kro
data["Order Date"]=pd.to_datetime(data["Order Date"])


# Feature Engineering

# Month
data["Month"]=data["Order Date"].dt.month

# Date
data["Date"]=data["Order Date"].dt.date

# Year
data["Year"]=data["Order Date"].dt.year





# print(data.head())



# Total Sales
Total_sales=data["Sales"].sum()
# print(Total_sales)

# Top 10 Best Products

best_products=(data.groupby("Product Name")["Sales"].sum().sort_values(ascending=False).head(10))
# print(best_products)

# Visualization
import matplotlib.pyplot as plt
import seaborn as sns

# best_products.plot(kind="bar")
# plt.title("Top 10 best product")
# plt.savefig("reports/charts/best_product.png")
# plt.show()


# Worst Products
worst_product=data.groupby("Product Name")["Sales"].sum().sort_values().head()
# print(worst_product)

# same plot in this


# Category Wise Sales
category=data.groupby("Category")["Sales"].sum()
# print(category)

# category.plot(kind="pie")
# plt.title("Category wise sales")
# plt.savefig("reports/charts/category_wise_Sales.png")

# plt.show()


# Region Wise Sales
Region_sales=data.groupby("Region")["Sales"].sum()
# print(Region_sales)
# Region_sales.plot(kind='bar')
# plt.savefig("reports/charts/Region_wise_sales.png")
# plt.show()

# Monthly Sales Trend
# month year sales
data["Order Date"]=pd.to_datetime(data["Order Date"])

monthly_sales=data.groupby(data["Order Date"].dt.to_period("M"))["Sales"].sum()
# print(monthly_sales)
# plt.figure(figsize=(10,5))
# monthly_sales.plot()

# plt.title("Monthly Sales Trend")
# plt.savefig("reports/charts/monthly_sales_trend.png")
# plt.show()


