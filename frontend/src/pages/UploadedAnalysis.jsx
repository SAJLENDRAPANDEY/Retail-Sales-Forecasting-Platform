import { useEffect, useState } from "react";
import DynamicPieChart from "../components/DynamicPieChart";
import DynamicBarChart from "../components/DynamicBarChart";

const API_URL = import.meta.env.VITE_API_URL || "https://retail-sales-forecasting-platform.onrender.com";

const CHART_COLORS = [
  "#C8A96E", "#2C2A25", "#8B7355", "#A0956A",
  "#4A4640", "#D4BC8A", "#6B5E4E",
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Inter:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .ua-page {
    width: 100%;
    font-family: 'Inter', sans-serif;
  }

  /* ── Page header ── */
  .ua-page-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 28px;
    padding-bottom: 20px;
    border-bottom: 1px solid #E2DBCF;
  }

  .ua-eyebrow {
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #C8A96E;
    display: block;
    margin-bottom: 4px;
  }

  .ua-title {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 400;
    color: #2C2A25;
    margin: 0;
    line-height: 1;
  }

  .ua-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 9px 18px;
    background-color: #2C2A25;
    color: #F5F0E8;
    border: none;
    border-radius: 6px;
    font-family: 'Inter', sans-serif;
    font-size: 12.5px;
    font-weight: 500;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: background-color 0.2s;
    text-decoration: none;
  }
  .btn-primary:hover { background-color: #3D3A33; }
  .btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-danger {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 9px 18px;
    background-color: transparent;
    color: #B85C4A;
    border: 1px solid #D9A99E;
    border-radius: 6px;
    font-family: 'Inter', sans-serif;
    font-size: 12.5px;
    font-weight: 500;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s;
  }
  .btn-danger:hover {
    background-color: #FDF0EE;
    border-color: #B85C4A;
  }

  /* ── Section ── */
  .ua-section { margin-bottom: 36px; }
  .ua-section:last-child { margin-bottom: 0; }

  .section-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 400;
    color: #2C2A25;
    margin: 0;
  }
  .section-divider {
    height: 1px;
    background-color: #E2DBCF;
    margin-bottom: 20px;
    margin-top: -4px;
  }

  /* ── Category tag ── */
  .category-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background-color: #EDE8DE;
    border: 1px solid #D8D2C6;
    border-radius: 6px;
    padding: 8px 14px;
    margin-bottom: 28px;
  }
  .category-tag-label {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: #9A9288;
  }
  .category-tag-value {
    font-size: 13px;
    font-weight: 500;
    color: #2C2A25;
  }

  /* ── KPI row ── */
  .kpi-row {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 14px;
  }

  .kpi-card {
    background-color: #FDFAF5;
    border: 1px solid #E2DBCF;
    border-radius: 10px;
    padding: 20px 22px 18px;
    position: relative;
    overflow: hidden;
    transition: box-shadow 0.2s, transform 0.15s;
    min-width: 0;
  }
  .kpi-card:hover {
    box-shadow: 0 4px 16px rgba(44,42,37,0.08);
    transform: translateY(-1px);
  }
  .kpi-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 3px; height: 100%;
    background-color: #C8A96E;
  }
  .kpi-card.hero {
    background-color: #2C2A25;
    border-color: #2C2A25;
  }
  .kpi-card.hero::before {
    background-color: #C8A96E;
    width: 4px;
  }
  .kpi-label {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: #9A9288;
    margin: 0 0 10px;
  }
  .kpi-card.hero .kpi-label { color: rgba(200,169,110,0.75); }
  .kpi-value {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 400;
    color: #2C2A25;
    line-height: 1.1;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .kpi-value.hero-val { font-size: 32px; color: #F5F0E8; }

  /* ── Charts grid ── */
  .charts-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  }
  .chart-card {
    background-color: #FDFAF5;
    border: 1px solid #E2DBCF;
    border-radius: 10px;
    padding: 22px;
    min-width: 0;
  }
  .chart-card-eyebrow {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: #9A9288;
    margin: 0 0 4px;
  }
  .chart-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    font-weight: 400;
    color: #2C2A25;
    margin: 0 0 18px;
  }

  /* ── AI Insights card ── */
  .insights-card {
    background-color: #FDFAF5;
    border: 1px solid #E2DBCF;
    border-radius: 10px;
    padding: 24px;
    margin-top: 0;
  }
  .insights-text {
    font-size: 14px;
    font-weight: 300;
    color: #4A4640;
    line-height: 1.8;
    white-space: pre-wrap;
    margin: 0;
    font-family: 'Inter', sans-serif;
  }
  .insights-loading {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    color: #9A9288;
    font-style: italic;
  }

  /* ── Empty state ── */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 55vh;
    text-align: center;
  }
  .empty-icon { font-size: 44px; margin-bottom: 20px; opacity: 0.35; }
  .empty-title {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 400;
    color: #2C2A25;
    margin: 0 0 10px;
  }
  .empty-sub {
    font-size: 14px;
    font-weight: 300;
    color: #7A7468;
    line-height: 1.65;
    max-width: 340px;
    margin: 0 0 28px;
  }
  .empty-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 11px 24px;
    background-color: #2C2A25;
    color: #F5F0E8;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-decoration: none;
    cursor: pointer;
    border: none;
    transition: background-color 0.2s;
  }
  .empty-cta:hover { background-color: #3D3A33; }

  /* ── Confirm modal overlay (inline, not fixed) ── */
  .modal-overlay {
    position: absolute;
    inset: 0;
    background: rgba(44,42,37,0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
    padding: 20px;
    border-radius: inherit;
  }
  .ua-page { position: relative; }
  .modal-box {
    background: #FDFAF5;
    border: 1px solid #E2DBCF;
    border-radius: 12px;
    padding: 32px 30px;
    max-width: 380px;
    width: 100%;
    text-align: center;
  }
  .modal-icon { font-size: 32px; margin-bottom: 14px; }
  .modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    color: #2C2A25;
    margin: 0 0 8px;
  }
  .modal-sub {
    font-size: 13.5px;
    font-weight: 300;
    color: #7A7468;
    line-height: 1.6;
    margin: 0 0 24px;
  }
  .modal-btns {
    display: flex;
    gap: 10px;
    justify-content: center;
  }
  .modal-cancel {
    padding: 9px 20px;
    background: transparent;
    border: 1px solid #D8D2C6;
    border-radius: 6px;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #4A4640;
    cursor: pointer;
    transition: background 0.15s;
  }
  .modal-cancel:hover { background: #EDE8DE; }
  .modal-confirm {
    padding: 9px 20px;
    background: #B85C4A;
    border: none;
    border-radius: 6px;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: white;
    cursor: pointer;
    transition: background 0.15s;
  }
  .modal-confirm:hover { background: #A04838; }

  @media (max-width: 900px) {
    .kpi-row { grid-template-columns: 1fr 1fr; }
    .charts-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 560px) {
    .kpi-row { grid-template-columns: 1fr; }
  }
`;

/* ─────────────────────────────────────────────
   KpiCard sub-component
───────────────────────────────────────────── */
function KpiCard({ label, value }) {
  return (
    <div className="kpi-card">
      <p className="kpi-label">{label}</p>
      <p className="kpi-value">{value}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
function UploadedAnalysis() {
  const [data, setData]             = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [aiInsights, setAiInsights] = useState("");
  const [insightsLoading, setInsightsLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  /* Load analysis from localStorage on mount */
  useEffect(() => {
    const stored = localStorage.getItem("uploadedAnalysis");
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch {
        console.error("Failed to parse stored analysis");
      }
    }
  }, []);

  /* ── Download PDF ── */
  const downloadPDF = async () => {
    if (!data) {
      alert("No analysis data found");
      return;
    }
    setPdfLoading(true);
    try {
      const response = await fetch(`${API_URL}/download-upload-report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(errorText);
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();
      const url  = window.URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = "uploaded_analysis.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF Download Error:", error);
      alert("Unable to download PDF report");
    } finally {
      setPdfLoading(false);
    }
  };

  /* ── Generate AI insights ── */
  const generateInsights = async () => {
    if (!data) return;
    setInsightsLoading(true);
    setAiInsights("");
    try {
      const response = await fetch(`${API_URL}/generate-ai-insights`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to generate insights");

      const result = await response.json();
      setAiInsights(result.insights || "No insights returned.");
    } catch (error) {
      console.error("AI Insights Error:", error);
      alert("Unable to generate AI insights");
    } finally {
      setInsightsLoading(false);
    }
  };

  /* ── Clear analysis ── */
  const clearAnalysis = () => {
    localStorage.removeItem("uploadedAnalysis");
    setData(null);
    setAiInsights("");
    setShowConfirm(false);
  };

  const categoryColumn =
    data?.selected_category || data?.selected_category_column || "—";

  /* ────────────────────── RENDER ────────────────────── */
  return (
    <>
      <style>{styles}</style>
      <div className="ua-page">

        {/* ── Page header ── */}
        <div className="ua-page-header">
          <div>
            <span className="ua-eyebrow">Analysis Report</span>
            <h1 className="ua-title">Uploaded Dataset Analysis</h1>
          </div>

          {data && (
            <div className="ua-actions">
              <button
                className="btn-primary"
                onClick={downloadPDF}
                disabled={pdfLoading}
              >
                ↓&nbsp;{pdfLoading ? "Generating..." : "Download PDF Report"}
              </button>

              <button
                className="btn-primary"
                onClick={generateInsights}
                disabled={insightsLoading}
              >
                ✦&nbsp;{insightsLoading ? "Generating..." : "Generate AI Insights"}
              </button>

              <button
                className="btn-danger"
                onClick={() => setShowConfirm(true)}
              >
                ✕&nbsp;Clear Analysis
              </button>
            </div>
          )}
        </div>

        {/* ── Empty state ── */}
        {!data ? (
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <h2 className="empty-title">No analysis found.</h2>
            <p className="empty-sub">
              Upload an Excel dataset first. Once analyzed, your full report will appear here.
            </p>
            <a href="/upload" className="empty-cta">↑&nbsp;Upload a dataset</a>
          </div>

        ) : (
          <>
            {/* ── Category tag ── */}
            <div className="category-tag">
              <span className="category-tag-label">Category column</span>
              <span className="category-tag-value">{categoryColumn}</span>
            </div>

            {/* ── KPI Cards ── */}
            <section className="ua-section">
              <div className="section-header">
                <h2 className="section-title">Key Metrics</h2>
              </div>
              <div className="section-divider" />
              <div className="kpi-row">
                <div className="kpi-card hero">
                  <p className="kpi-label">Total Sales</p>
                  <p className="kpi-value hero-val">
                    ₹ {Number(data.total_sales || 0).toLocaleString()}
                  </p>
                </div>
                <KpiCard
                  label="Average Sales"
                  value={"₹ " + Number(data.avg_sales || 0).toFixed(2)}
                />
                <KpiCard
                  label="Total Records"
                  value={Number(
                    data.total_records || data.total_orders || 0
                  ).toLocaleString()}
                />
              </div>
            </section>

            {/* ── Charts ── */}
            {data.category_chart && (
              <section className="ua-section">
                <div className="section-header">
                  <h2 className="section-title">Category Wise Sales</h2>
                </div>
                <div className="section-divider" />
                <div className="charts-grid">
                  <div className="chart-card">
                    <p className="chart-card-eyebrow">Distribution</p>
                    <p className="chart-card-title">Sales by Share</p>
                    <DynamicPieChart
                      data={data.category_chart}
                      colors={CHART_COLORS}
                    />
                  </div>
                  <div className="chart-card">
                    <p className="chart-card-eyebrow">Comparison</p>
                    <p className="chart-card-title">Sales by Category</p>
                    <DynamicBarChart
                      data={data.category_chart}
                      colors={CHART_COLORS}
                    />
                  </div>
                </div>
              </section>
            )}

            {/* ── AI Insights ── */}
            {(aiInsights || insightsLoading) && (
              <section className="ua-section">
                <div className="section-header">
                  <h2 className="section-title">AI Business Insights</h2>
                </div>
                <div className="section-divider" />
                <div className="insights-card">
                  {insightsLoading ? (
                    <div className="insights-loading">
                      <span>✦</span>
                      <span>Generating insights from your data...</span>
                    </div>
                  ) : (
                    <pre className="insights-text">{aiInsights}</pre>
                  )}
                </div>
              </section>
            )}
          </>
        )}

        {/* ── Confirm clear modal ── */}
        {showConfirm && (
          <div
            className="modal-overlay"
            onClick={() => setShowConfirm(false)}
          >
            <div
              className="modal-box"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-icon">🗑️</div>
              <h3 className="modal-title">Clear this analysis?</h3>
              <p className="modal-sub">
                This will remove the current dataset analysis from your session.
                You'll need to re-upload to see results again.
              </p>
              <div className="modal-btns">
                <button
                  className="modal-cancel"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
                <button className="modal-confirm" onClick={clearAnalysis}>
                  Yes, clear it
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default UploadedAnalysis;