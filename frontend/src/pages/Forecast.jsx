import { useEffect, useState } from "react";
import API from "../api/api";

function Forecast() {
  const [trendData, setTrendData] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);

  const [year, setYear] = useState("");

  const [loading, setLoading] = useState(true);

  const [totalSales, setTotalSales] = useState(0);
  const [avgSales, setAvgSales] = useState(0);
  const [bestMonth, setBestMonth] = useState("");

  useEffect(() => {
    fetchTrendData();
    fetchYears();
  }, []);

  const fetchTrendData = async () => {
    try {
      const response = await API.get(
        "/sales-trend"
      );

      const data = response.data;

      setTrendData(data);

      if (data.length > 0) {
        const total = data.reduce(
          (sum, item) =>
            sum + item.sales,
          0
        );

        setTotalSales(total);

        setAvgSales(
          total / data.length
        );

        const highest =
          data.reduce(
            (max, item) =>
              item.sales >
              max.sales
                ? item
                : max,
            data[0]
          );

        setBestMonth(
          highest.date
        );
      }
    } catch (error) {
      console.error(
        "Forecast Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchYears = async () => {
    try {
      const response =
        await API.get(
          "/forecast-years"
        );

      setAvailableYears(
        response.data.years || []
      );
    } catch (error) {
      console.error(
        "Year Fetch Error:",
        error
      );
    }
  };

  const filteredData = year
    ? trendData.filter(
        (item) =>
          item.date.startsWith(
            year
          )
      )
    : trendData;

  if (loading) {
    return (
      <h2>
        Loading Forecast Data...
      </h2>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>
        Sales Forecast Dashboard
      </h1>

      <p>
        Monthly Sales Analysis
      </p>

      {/* KPI Cards */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "25px",
          marginBottom: "30px",
        }}
      >
        <Card
          title="Total Sales"
          value={
            "Rs. " +
            totalSales.toLocaleString()
          }
        />

        <Card
          title="Average Monthly Sales"
          value={
            "Rs. " +
            avgSales.toFixed(2)
          }
        />

        <Card
          title="Best Sales Month"
          value={bestMonth}
        />

        <Card
          title="Months Available"
          value={
            trendData.length
          }
        />
      </div>

      {/* Year Filter */}

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <label>
          Select Year:
        </label>

        <br />
        <br />

        <select
          value={year}
          onChange={(e) =>
            setYear(
              e.target.value
            )
          }
          style={{
            padding: "10px",
            minWidth: "200px",
          }}
        >
          <option value="">
            All Years
          </option>

          {availableYears.map(
            (yr) => (
              <option
                key={yr}
                value={yr}
              >
                {yr}
              </option>
            )
          )}
        </select>
      </div>

      {/* Sales History */}

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2>
          Monthly Sales History
        </h2>

        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            borderCollapse:
              "collapse",
            marginTop: "15px",
          }}
        >
          <thead>
            <tr>
              <th>Month</th>
              <th>Sales</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map(
              (
                item,
                index
              ) => (
                <tr key={index}>
                  <td>
                    {item.date}
                  </td>

                  <td>
                    Rs.{" "}
                    {Number(
                      item.sales
                    ).toLocaleString()}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Future Forecast */}

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          background: "#f8fafc",
          borderRadius: "10px",
        }}
      >
        <h2>
          Future Forecast
        </h2>

        <p>
          Model Integration Pending
        </p>

        <p>
          Next Step:
          Add Month + Year
          prediction using
          model.pkl and ARIMA.
        </p>
      </div>
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
        minWidth: "220px",
        flex: 1,
        padding: "20px",
        borderRadius: "10px",
        background: "#ffffff",
        border:
          "1px solid #ddd",
      }}
    >
      <h3>{title}</h3>

      <p
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          color: "#2563eb",
        }}
      >
        {value}
      </p>
    </div>
  );
}

export default Forecast;