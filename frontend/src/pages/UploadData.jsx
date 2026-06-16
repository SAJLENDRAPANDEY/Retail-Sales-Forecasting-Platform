import { useState } from "react";
import API from "../api/api";
import DynamicPieChart from "../components/DynamicPieChart";
import DynamicBarChart from "../components/DynamicBarChart";

function UploadData() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const [mapping, setMapping] = useState({
    sales: "",
    category: "",
  });

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await API.post(
        "/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Upload Error:", error);
      alert("File upload failed");
    }
  };

  const analyzeData = async () => {
    if (!mapping.sales || !mapping.category) {
      alert("Please select both Sales and Category columns");
      return;
    }

    try {
      const response = await API.post(
  "/analyze",
  mapping
);

localStorage.setItem(
  "uploadedAnalysis",
  JSON.stringify(response.data)
);

setAnalysis(response.data);

console.log(response.data);
    } catch (error) {
      console.error("Analysis Error:", error);
      alert("Analysis failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Upload Dataset</h1>

      <input
        type="file"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <button
        onClick={handleUpload}
        style={{
          marginLeft: "10px",
          padding: "8px 15px",
        }}
      >
        Upload
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Available Columns</h3>

          <ul>
            {result.columns.map((col, index) => (
              <li key={index}>{col}</li>
            ))}
          </ul>

          <h3>Select Sales Column</h3>

          <select
            value={mapping.sales}
            onChange={(e) =>
              setMapping({
                ...mapping,
                sales: e.target.value,
              })
            }
          >
            <option value="">
              Select Sales Column
            </option>

            {result.columns.map((col) => (
              <option
                key={col}
                value={col}
              >
                {col}
              </option>
            ))}
          </select>

          <br />
          <br />

          <h3>Select Category Column</h3>

          <select
            value={mapping.category}
            onChange={(e) =>
              setMapping({
                ...mapping,
                category: e.target.value,
              })
            }
          >
            <option value="">
              Select Category Column
            </option>

            {result.columns.map((col) => (
              <option
                key={col}
                value={col}
              >
                {col}
              </option>
            ))}
          </select>

          <br />
          <br />

          <button
            onClick={analyzeData}
            style={{
              padding: "8px 15px",
            }}
          >
            Analyze Data
          </button>
        </div>
      )}

      {analysis && (
        <div style={{ marginTop: "30px" }}>
          <h2>
            Total Sales: ₹
            {analysis.total_sales?.toLocaleString()}
          </h2>

          {analysis.total_orders && (
            <h3>
              Total Orders:{" "}
              {analysis.total_orders}
            </h3>
          )}

          {analysis.avg_sales && (
            <h3>
              Average Sales: ₹
              {Number(
                analysis.avg_sales
              ).toFixed(2)}
            </h3>
          )}

          {analysis.category_chart && (
            <>
              <h3>Category Wise Sales</h3>

              <DynamicPieChart
                data={
                  analysis.category_chart
                }
              />

              <br />

              <DynamicBarChart
                data={
                  analysis.category_chart
                }
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default UploadData;