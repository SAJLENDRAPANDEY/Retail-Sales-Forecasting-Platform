import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import DynamicPieChart from "../components/DynamicPieChart";
import DynamicBarChart from "../components/DynamicBarChart";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#FAF7F2",
    padding: "40px 24px",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "32px",
  },
  headerTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#2C2416",
    margin: "0 0 6px 0",
    letterSpacing: "-0.3px",
  },
  headerSub: {
    fontSize: "14px",
    color: "#8B7D6B",
    margin: 0,
  },
  card: {
    background: "#FFFFFF",
    borderRadius: "16px",
    border: "1px solid #EDE8DF",
    padding: "28px",
    marginBottom: "24px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#2C2416",
    margin: "0 0 18px 0",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  cardTitleDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#C8A96E",
    display: "inline-block",
  },
  uploadZone: {
    border: "2px dashed #D4C9B5",
    borderRadius: "12px",
    padding: "36px 24px",
    textAlign: "center",
    background: "#FDFBF8",
    cursor: "pointer",
    transition: "border-color 0.2s",
  },
  uploadIcon: {
    fontSize: "40px",
    marginBottom: "10px",
    display: "block",
    color: "#B8A898",
  },
  uploadText: {
    fontSize: "15px",
    color: "#5C5145",
    fontWeight: "500",
    margin: "0 0 4px 0",
  },
  uploadHint: {
    fontSize: "13px",
    color: "#A09283",
    margin: "0 0 16px 0",
  },
  fileInput: {
    display: "none",
  },
  fileLabel: {
    display: "inline-block",
    background: "#2C2416",
    color: "#FAF7F2",
    padding: "9px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    letterSpacing: "0.3px",
    transition: "opacity 0.2s",
  },
  fileNameTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "#F0EBE1",
    border: "1px solid #DDD5C6",
    borderRadius: "6px",
    padding: "5px 12px",
    fontSize: "13px",
    color: "#5C5145",
    marginTop: "12px",
    fontWeight: "500",
  },
  uploadBtn: {
    background: "#C8A96E",
    color: "#FFFFFF",
    border: "none",
    padding: "10px 24px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "14px",
    transition: "background 0.2s",
    display: "block",
    margin: "14px auto 0",
  },
  columnGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "20px",
  },
  columnList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "20px",
  },
  columnBadge: {
    background: "#F0EBE1",
    border: "1px solid #DDD5C6",
    borderRadius: "6px",
    padding: "5px 12px",
    fontSize: "12px",
    color: "#5C5145",
    fontWeight: "500",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#5C5145",
    marginBottom: "6px",
    display: "block",
    letterSpacing: "0.2px",
  },
  select: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #DDD5C6",
    background: "#FDFBF8",
    fontSize: "14px",
    color: "#2C2416",
    outline: "none",
    cursor: "pointer",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238B7D6B' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
    paddingRight: "36px",
  },
  analyzeBtn: {
    background: "#2C2416",
    color: "#FAF7F2",
    border: "none",
    padding: "12px 32px",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "opacity 0.2s",
    letterSpacing: "0.2px",
  },
  tableWrapper: {
    overflowX: "auto",
    borderRadius: "12px",
    border: "1px solid #EDE8DF",
    marginTop: "4px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px",
  },
  thead: {
    background: "#F4EFE6",
  },
  th: {
    padding: "12px 16px",
    textAlign: "left",
    fontWeight: "600",
    color: "#5C5145",
    borderBottom: "1px solid #EDE8DF",
    whiteSpace: "nowrap",
    fontSize: "12px",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  td: {
    padding: "11px 16px",
    color: "#2C2416",
    borderBottom: "1px solid #F4EFE6",
    whiteSpace: "nowrap",
    fontSize: "13px",
  },
  trEven: {
    background: "#FDFBF8",
  },
  trOdd: {
    background: "#FFFFFF",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "24px",
  },
  statCard: {
    background: "#FFFFFF",
    borderRadius: "12px",
    border: "1px solid #EDE8DF",
    padding: "20px",
    textAlign: "center",
  },
  statLabel: {
    fontSize: "12px",
    color: "#8B7D6B",
    fontWeight: "600",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    marginBottom: "8px",
  },
  statValue: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#2C2416",
  },
  divider: {
    border: "none",
    borderTop: "1px solid #EDE8DF",
    margin: "24px 0",
  },
  successBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    background: "#EAF3DE",
    color: "#3B6D11",
    border: "1px solid #C0DD97",
    borderRadius: "6px",
    padding: "4px 10px",
    fontSize: "12px",
    fontWeight: "600",
  },
};

function UploadData() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const [mapping, setMapping] = useState({
    sales: "",
    category: "",
  });

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await API.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(response.data);
    } catch (error) {
      console.error("Upload Error:", error);
      alert("File upload failed");
    } finally {
      setUploading(false);
    }
  };

  const analyzeData = async () => {
    if (!mapping.sales || !mapping.category) {
      alert("Please select both Sales and Category columns");
      return;
    }
    setAnalyzing(true);
    try {
      const response = await API.post("/analyze", mapping);
      setAnalysis(response.data);

      localStorage.setItem("uploadedAnalysis", JSON.stringify(response.data));
      localStorage.setItem(
        "datasetInfo",
        JSON.stringify({
          fileName: file?.name || "Dataset",
          rows: result?.rows || 0,
          columns: result?.columns?.length || 0,
          analysisDate: new Date().toLocaleString(),
        })
      );

      navigate("/dashboard");
    } catch (error) {
      console.error("Analysis Error:", error);
      alert("Analysis failed");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Upload Dataset</h1>
          <p style={styles.headerSub}>Upload your CSV or Excel file to generate sales insights</p>
        </div>

        {/* Upload Card */}
        <div style={styles.card}>
          <p style={styles.cardTitle}>
            <span style={styles.cardTitleDot} />
            Select File
          </p>

          <div style={styles.uploadZone}>
            <span style={{ fontSize: "40px", display: "block", marginBottom: "10px" }}>📂</span>
            <p style={styles.uploadText}>Drag & drop or browse your file</p>
            <p style={styles.uploadHint}>Supports CSV, XLSX, XLS</p>

            <label style={styles.fileLabel}>
              Browse Files
              <input
                type="file"
                style={styles.fileInput}
                onChange={(e) => setFile(e.target.files[0])}
                accept=".csv,.xlsx,.xls"
              />
            </label>

            {file && (
              <div style={{ marginTop: "12px" }}>
                <span style={styles.fileNameTag}>
                  📄 {file.name}
                </span>
              </div>
            )}
          </div>

          {file && (
            <button
              onClick={handleUpload}
              disabled={uploading}
              style={{
                ...styles.uploadBtn,
                opacity: uploading ? 0.7 : 1,
              }}
            >
              {uploading ? "Uploading..." : "⬆ Upload File"}
            </button>
          )}
        </div>

        {/* Column Mapping + Preview */}
        {result && (
          <>
            {/* Columns detected */}
            <div style={styles.card}>
              <p style={styles.cardTitle}>
                <span style={styles.cardTitleDot} />
                Detected Columns
                <span style={{ marginLeft: "auto", ...styles.successBadge }}>
                  ✓ {result.columns?.length} columns found
                </span>
              </p>
              <div style={styles.columnList}>
                {result.columns?.map((col, index) => (
                  <span key={index} style={styles.columnBadge}>{col}</span>
                ))}
              </div>

              <hr style={styles.divider} />

              {/* Column Mapping */}
              <p style={styles.cardTitle}>
                <span style={styles.cardTitleDot} />
                Map Columns
              </p>
              <div style={styles.columnGrid}>
                <div>
                  <label style={styles.label}>Sales Column</label>
                  <select
                    style={styles.select}
                    value={mapping.sales}
                    onChange={(e) => setMapping({ ...mapping, sales: e.target.value })}
                  >
                    <option value="">Select sales column</option>
                    {result.columns?.map((col) => (
                      <option key={col} value={col}>{col}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={styles.label}>Category Column</label>
                  <select
                    style={styles.select}
                    value={mapping.category}
                    onChange={(e) => setMapping({ ...mapping, category: e.target.value })}
                  >
                    <option value="">Select category column</option>
                    {result.columns?.map((col) => (
                      <option key={col} value={col}>{col}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={analyzeData}
                disabled={analyzing}
                style={{
                  ...styles.analyzeBtn,
                  opacity: analyzing ? 0.7 : 1,
                  marginTop: "8px",
                }}
              >
                {analyzing ? "Analyzing..." : "🔍 Analyze Data"}
              </button>
            </div>

            {/* Data Preview Table */}
            {result.preview && result.preview.length > 0 && (
              <div style={styles.card}>
                <p style={styles.cardTitle}>
                  <span style={styles.cardTitleDot} />
                  Data Preview
                  <span style={{ marginLeft: "auto", fontSize: "12px", color: "#8B7D6B", fontWeight: "400" }}>
                    Showing {result.preview.length} rows
                  </span>
                </p>

                <div style={styles.tableWrapper}>
                  <table style={styles.table}>
                    <thead style={styles.thead}>
                      <tr>
                        <th style={{ ...styles.th, color: "#8B7D6B", width: "48px" }}>#</th>
                        {Object.keys(result.preview[0]).map((col) => (
                          <th key={col} style={styles.th}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.preview.map((row, index) => (
                        <tr
                          key={index}
                          style={index % 2 === 0 ? styles.trEven : styles.trOdd}
                        >
                          <td style={{ ...styles.td, color: "#A09283", fontWeight: "500" }}>
                            {index + 1}
                          </td>
                          {Object.values(row).map((value, idx) => (
                            <td key={idx} style={styles.td}>
                              {String(value)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {/* Analysis Results */}
        {analysis && (
          <>
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <p style={styles.statLabel}>Total Sales</p>
                <p style={styles.statValue}>₹{analysis.total_sales?.toLocaleString()}</p>
              </div>
              <div style={styles.statCard}>
                <p style={styles.statLabel}>Average Sales</p>
                <p style={styles.statValue}>₹{Number(analysis.avg_sales).toFixed(2)}</p>
              </div>
              <div style={styles.statCard}>
                <p style={styles.statLabel}>Total Orders</p>
                <p style={styles.statValue}>{analysis.total_orders || analysis.total_records}</p>
              </div>
            </div>

            {analysis.category_chart && (
              <div style={styles.card}>
                <p style={styles.cardTitle}>
                  <span style={styles.cardTitleDot} />
                  Category Wise Sales
                </p>
                <DynamicPieChart data={analysis.category_chart} />
                <br />
                <DynamicBarChart data={analysis.category_chart} />
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}

export default UploadData;