import { Navigate } from "react-router-dom";
import DynamicPieChart from "../components/DynamicPieChart";
import DynamicBarChart from "../components/DynamicBarChart";

function Analytics() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const analysis = JSON.parse(
    localStorage.getItem("uploadedAnalysis")
  );

  console.log("Analytics Data:", analysis);

  if (!analysis) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "120px",
        }}
      >
        <h2>No Dataset Analysis Found</h2>

        <p>
          Please upload and analyze a dataset first.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "25px",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* Header */}

      <h1>Analytics Dashboard</h1>

      <p>
        Dataset Insights, Quality Report &
        Category Analysis
      </p>

      {/* Debug Data */}

      <details
        style={{
          marginTop: "15px",
          marginBottom: "25px",
        }}
      >
        <summary>
          View Raw Analysis Data
        </summary>

        <pre
          style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "8px",
            overflowX: "auto",
          }}
        >
          {JSON.stringify(
            analysis,
            null,
            2
          )}
        </pre>
      </details>

      {/* KPI Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <Card
          title="Top Category"
          value={
            analysis.top_category ||
            "N/A"
          }
        />

        <Card
          title="Highest Sale"
          value={`₹${Number(
            analysis.highest_sale || 0
          ).toLocaleString()}`}
        />

        <Card
          title="Lowest Sale"
          value={`₹${Number(
            analysis.lowest_sale || 0
          ).toLocaleString()}`}
        />

        <Card
          title="Total Sales"
          value={`₹${Number(
            analysis.total_sales || 0
          ).toLocaleString()}`}
        />

        <Card
          title="Top Category Sales"
          value={`₹${Number(
            analysis.top_category_sales || 0
          ).toLocaleString()}`}
        />

        <Card
          title="Missing Values"
          value={
            analysis.missing_values || 0
          }
        />

        <Card
          title="Duplicate Rows"
          value={
            analysis.duplicate_rows || 0
          }
        />

        <Card
          title="Quality Score"
          value={`${
            analysis.quality_score || 100
          }%`}
        />
      </div>

      {/* Dataset Health Report */}

      <div
        style={{
          marginTop: "40px",
          background: "#fff",
          padding: "25px",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          boxShadow:
            "0px 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <h2>
          Dataset Health Report
        </h2>

        <hr />

        <p>
          <strong>Total Rows:</strong>{" "}
          {analysis.total_rows || 0}
        </p>

        <p>
          <strong>
            Total Columns:
          </strong>{" "}
          {analysis.total_columns || 0}
        </p>

        <p>
          <strong>
            Missing Values:
          </strong>{" "}
          {analysis.missing_values || 0}
        </p>

        <p>
          <strong>
            Duplicate Rows:
          </strong>{" "}
          {analysis.duplicate_rows || 0}
        </p>

        <p>
          <strong>
            Selected Sales Column:
          </strong>{" "}
          {
            analysis.selected_sales_column
          }
        </p>

        <p>
          <strong>
            Selected Category Column:
          </strong>{" "}
          {
            analysis.selected_category_column
          }
        </p>

        <p>
          <strong>
            Dataset Quality:
          </strong>{" "}
          {analysis.quality_score || 100}%
        </p>
      </div>

      {/* Charts Section */}

      {analysis.category_chart &&
        analysis.category_chart.length >
          0 && (
          <div
            style={{
              marginTop: "40px",
            }}
          >
            <h2>
              Category Analysis
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(450px,1fr))",
                gap: "25px",
                marginTop: "20px",
              }}
            >
              {/* Pie Chart */}

              <div
                style={{
                  background:
                    "#ffffff",
                  padding:
                    "20px",
                  borderRadius:
                    "12px",
                  border:
                    "1px solid #e5e7eb",
                  boxShadow:
                    "0px 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <h3>
                  Sales Distribution
                </h3>

                <DynamicPieChart
                  data={
                    analysis.category_chart
                  }
                />
              </div>

              {/* Bar Chart */}

              <div
                style={{
                  background:
                    "#ffffff",
                  padding:
                    "20px",
                  borderRadius:
                    "12px",
                  border:
                    "1px solid #e5e7eb",
                  boxShadow:
                    "0px 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <h3>
                  Category Sales
                  Comparison
                </h3>

                <DynamicBarChart
                  data={
                    analysis.category_chart
                  }
                />
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

function Card({
  title,
  value,
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        boxShadow:
          "0px 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <h3
        style={{
          marginBottom: "10px",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          color: "#2563eb",
          margin: 0,
        }}
      >
        {value}
      </p>
    </div>
  );
}

export default Analytics;