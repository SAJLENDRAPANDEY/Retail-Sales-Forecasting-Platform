# Retail Sales Forecasting Platform

## Overview

Retail Sales Forecasting Platform is an end-to-end Data Analytics and Machine Learning project that helps businesses analyze historical sales data, visualize trends, generate reports, and forecast future sales.

The project combines:

* Data Analysis
* Machine Learning
* FastAPI Backend
* React Dashboard
* SQLite Database
* MLflow Experiment Tracking

---

## Features

### Dashboard

* Total Sales KPI
* Total Orders KPI
* Total Products KPI
* Sales Trend Visualization
* Region-wise Sales Analysis
* Category-wise Sales Analysis
* Top Products Analysis

### Forecasting

* Sales Prediction using Machine Learning
* Random Forest
* Linear Regression
* XGBoost

### Reports

* Excel Report Generation
* PDF Report Generation

### Authentication

* User Registration
* User Login

### Testing

* API Testing
* Model Testing

### MLflow

* Experiment Tracking
* Metric Logging
* Model Versioning

---

## Project Architecture

Retail-Sales-Forecasting

* frontend/
* backend/
* ml/
* database/
* reports/
* tests/
* mlruns/

---

## Tech Stack

### Frontend

* React
* Axios
* Recharts

### Backend

* FastAPI
* SQLAlchemy

### Database

* SQLite

### Machine Learning

* Scikit-Learn
* XGBoost
* Pandas
* NumPy

### DevOps

* GitHub Actions
* MLflow

---

## Installation

### Clone Repository

git clone <repository-url>

### Backend

pip install -r backend/requirements.txt

python -m uvicorn backend.main:app --reload

### Frontend

cd frontend

npm install

npm run dev

---

## API Endpoints

GET /dashboard

GET /analytics

GET /sales-trend

GET /top-products

POST /predict

GET /download-excel

GET /download-pdf

---

## Future Improvements

* PostgreSQL Integration
* Docker Support
* Cloud Deployment
* Advanced Forecasting Models
* Real-time Analytics

---

## Author

Sajlendra Pandey

Data Analyst | Machine Learning Enthusiast
