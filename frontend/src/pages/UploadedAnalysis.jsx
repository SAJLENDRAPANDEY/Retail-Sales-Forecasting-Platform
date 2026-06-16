import { useEffect, useState } from "react";

import DynamicPieChart from "../components/DynamicPieChart";
import DynamicBarChart from "../components/DynamicBarChart";

function UploadedAnalysis() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem(
      "uploadedAnalysis"
    );

    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const downloadPDF = () => {
    window.open(
      "http://localhost:8000/download-upload-report",
      "_blank"
    );
  };

  if (!data) {
    return (
      <div>
        <h2>No Uploaded Analysis Found</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>
        Uploaded Dataset Analysis
      </h1>

      <h2>
        Total Sales : ₹
        {data.total_sales}
      </h2>

      {data.total_orders && (
        <h3>
          Total Orders :
          {data.total_orders}
        </h3>
      )}

      {data.avg_sales && (
        <h3>
          Average Sales : ₹
          {data.avg_sales}
        </h3>
      )}

      <button
        onClick={downloadPDF}
        style={{
          padding: "10px 20px",
          backgroundColor: "#1976d2",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Download PDF Report
      </button>

      <br />
      <br />

      {data.category_chart && (
        <>
          <h2>
            Category Wise Sales
            (Pie Chart)
          </h2>

          <DynamicPieChart
            data={data.category_chart}
          />

          <br />
          <br />

          <h2>
            Category Wise Sales
            (Bar Chart)
          </h2>

          <DynamicBarChart
            data={data.category_chart}
          />
        </>
      )}
    </div>
  );
}

export default UploadedAnalysis;