import { useEffect, useState } from "react";
import API from "../api/api";

import KPIcards from "../components/KPIcards";
import SalesChart from "../components/SalesChart";
import CategoryPieChart from "../components/CategoryPieChart";
import RegionBarChart from "../components/RegionBarChart";
import TopProductsTable from "../components/TopProductsTable";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    total_sales: 0,
    total_orders: 0,
    total_products: 0,
  });

  const [trendData, setTrendData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [regionData, setRegionData] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [
        dashboardResponse,
        trendResponse,
        categoryResponse,
        regionResponse,
      ] = await Promise.all([
        API.get("/dashboard"),
        API.get("/sales-trend"),
        API.get("/category-sales"),
        API.get("/region-sales"),
      ]);

      setDashboardData(dashboardResponse.data);
      setTrendData(trendResponse.data);
      setCategoryData(categoryResponse.data);
      setRegionData(regionResponse.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const downloadExcel = () => {
    window.open(
      "http://127.0.0.1:8000/download-excel",
      "_blank"
    );
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Retail Sales Dashboard
      </h1>

      {/* Download Button */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <button
          onClick={downloadExcel}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Download Excel Report
        </button>
      </div>

      {/* KPI Cards */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "40px",
        }}
      >
        <KPIcards
          title="Total Sales"
          value={dashboardData.total_sales}
        />

        <KPIcards
          title="Total Orders"
          value={dashboardData.total_orders}
        />

        <KPIcards
          title="Total Products"
          value={dashboardData.total_products}
        />
      </div>

      {/* Sales Trend */}
      <div style={{ marginBottom: "50px" }}>
        <h2>Sales Trend</h2>
        <SalesChart data={trendData} />
      </div>

      {/* Region Wise Sales */}
      <div style={{ marginBottom: "50px" }}>
        <h2>Region Wise Sales</h2>
        <RegionBarChart data={regionData} />
      </div>

      {/* Category Wise Sales */}
      <div style={{ marginBottom: "50px" }}>
        <h2>Category Wise Sales</h2>
        <CategoryPieChart data={categoryData} />
      </div>

      {/* Top Products */}
      <div style={{ marginBottom: "50px" }}>
        <h2>Top Products</h2>
        <TopProductsTable />
      </div>
    </div>
  );
}

export default Dashboard;