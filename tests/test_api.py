from fastapi.testclient import TestClient

from backend.main import app

client = TestClient(app)


def test_dashboard():

    response = client.get("/dashboard")

    assert response.status_code == 200

    data = response.json()

    assert "total_sales" in data
    assert "total_orders" in data
    assert "total_products" in data


def test_analytics():

    response = client.get("/analytics")

    assert response.status_code == 200

    data = response.json()

    assert "best_product" in data
    assert "top_region" in data
    assert "top_category" in data