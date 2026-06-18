import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import DynamicPieChart from "../components/DynamicPieChart";
import DynamicBarChart from "../components/DynamicBarChart";

const CHART_COLORS = [
  "#C8A96E", "#2C2A25", "#8B7355", "#A0956A",
  "#4A4640", "#D4BC8A",
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Inter:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .db-page {
    width: 100%;
    font-family: 'Inter', sans-serif;
  }

  /* ── Page header ── */
  .db-page-header {
    margin-bottom: 28px;
    padding-bottom: 20px;
    border-bottom: 1px solid #E2DBCF;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }

  .topbar-eyebrow {
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #C8A96E;
    display: block;
    margin-bottom: 4px;
  }

  .topbar-title {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 400;
    color: #2C2A25;
    margin: 0;
    line-height: 1;
  }

  .db-section {
    margin-bottom: 36px;
  }

  .db-section:last-child { margin-bottom: 0; }

  /* ── Empty State ── */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 55vh;
    text-align: center;
  }
  .empty-icon { font-size: 48px; margin-bottom: 24px; opacity: 0.35; }
  .empty-title {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 400;
    color: #2C2A25;
    margin: 0 0 10px;
  }
  .empty-sub {
    font-size: 14px;
    font-weight: 300;
    color: #7A7468;
    line-height: 1.65;
    max-width: 360px;
    margin: 0 0 32px;
  }
  .empty-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 26px;
    background-color: #2C2A25;
    color: #F5F0E8;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-decoration: none;
    transition: background-color 0.2s;
  }
  .empty-cta:hover { background-color: #3D3A33; }

  /* ── Success Badge ── */
  .success-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background-color: #EAF4EE;
    color: #2D6A4A;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 11.5px;
    font-weight: 500;
    letter-spacing: 0.04em;
    margin-bottom: 24px;
    border: 1px solid #C3DFD0;
  }
  .badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background-color: #2D6A4A;
    flex-shrink: 0;
  }

  /* ── Section Header ── */
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

  /* ── Dataset Summary Panel ── */
  .dataset-panel {
    background-color: #EDE8DE;
    border: 1px solid #D8D2C6;
    border-radius: 10px;
    overflow: hidden;
  }
  .dataset-table {
    width: 100%;
    border-collapse: collapse;
  }
  .dataset-table thead tr {
    border-bottom: 1px solid #D0CAC0;
  }
  .dataset-table th {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #9A9288;
    padding: 12px 20px;
    text-align: left;
  }
  .dataset-table td {
    font-size: 13.5px;
    font-weight: 400;
    color: #2C2A25;
    padding: 14px 20px;
    max-width: 260px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ── KPI Grid ── */
  .kpi-row {
    display: grid;
    gap: 14px;
    margin-bottom: 14px;
  }
  .kpi-row-top {
    grid-template-columns: 1.6fr 1fr 1fr 1fr 1fr;
  }
  .kpi-card {
    background-color: #FDFAF5;
    border: 1px solid #E2DBCF;
    border-radius: 10px;
    padding: 20px 20px 16px;
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
  .kpi-card.hero .kpi-label { color: rgba(200,169,110,0.8); }
  .kpi-value {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 400;
    color: #2C2A25;
    line-height: 1.1;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .kpi-value.hero-val { font-size: 30px; color: #F5F0E8; }
  .kpi-value.small { font-size: 16px; }

  /* ── Health Panel ── */
  .health-panel {
    background-color: #FDFAF5;
    border: 1px solid #E2DBCF;
    border-radius: 10px;
    padding: 22px 26px;
  }
  .health-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 22px;
  }
  .health-item { display: flex; flex-direction: column; gap: 5px; }
  .health-item-label {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: #9A9288;
  }
  .health-item-value {
    font-size: 26px;
    font-family: 'Playfair Display', serif;
    font-weight: 400;
    color: #2C2A25;
  }
  .health-item-value.good { color: #2D6A4A; }
  .health-item-value.warn { color: #B45309; }

  .quality-bar-wrap {
    padding-top: 18px;
    border-top: 1px solid #E2DBCF;
  }
  .quality-bar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
  .quality-bar-label {
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #4A4640;
  }
  .quality-bar-score {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    color: #2C2A25;
  }
  .quality-bar-track {
    height: 5px;
    background-color: #E2DBCF;
    border-radius: 99px;
    overflow: hidden;
  }
  .quality-bar-fill {
    height: 100%;
    background-color: #C8A96E;
    border-radius: 99px;
    transition: width 0.9s ease;
  }
  .quality-bar-fill.warn-fill { background-color: #B45309; }

  /* ── Charts ── */
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
  .chart-card-title {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: #9A9288;
    margin: 0 0 16px;
  }

  /* ── Responsive ── */
  @media (max-width: 1100px) {
    .kpi-row-top { grid-template-columns: 1.4fr 1fr 1fr 1fr; }
  }
  @media (max-width: 900px) {
    .kpi-row-top { grid-template-columns: 1fr 1fr 1fr; }
    .health-grid { grid-template-columns: repeat(2, 1fr); }
    .charts-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 600px) {
    .kpi-row-top { grid-template-columns: 1fr 1fr; }
    .health-grid { grid-template-columns: 1fr 1fr; }
  }
`;

function Dashboard() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) return <Navigate to="/login" />;

  const userName    = localStorage.getItem("userName") || "User";
  const analysis    = JSON.parse(localStorage.getItem("uploadedAnalysis"));
  const datasetInfo = JSON.parse(localStorage.getItem("datasetInfo"));
  const qualityScore  = analysis?.quality_score ?? 100;
  const isLowQuality  = qualityScore < 70;

  return (
    <>
      <style>{styles}</style>
      <div className="db-page">

        {/* Page header */}
        <div className="db-page-header">
          <div>
            <span className="topbar-eyebrow">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long", day: "numeric", month: "long",
              })}
            </span>
            <h1 className="topbar-title">Dashboard</h1>
          </div>
        </div>

        {!analysis ? (
          <div className="empty-state">
            <div className="empty-icon">📂</div>
            <h2 className="empty-title">Nothing here yet, {userName.split(" ")[0]}.</h2>
            <p className="empty-sub">
              Upload an Excel dataset and we'll generate insights, charts, and a health report automatically.
            </p>
            <Link to="/upload" className="empty-cta">↑ &nbsp;Upload your first dataset</Link>
          </div>
        ) : (
          <>
            <div className="success-badge">
              <div className="badge-dot" />
              Dataset analyzed successfully
            </div>

            {/* Dataset Summary */}
            {datasetInfo && (
              <section className="db-section">
                <div className="section-header">
                  <h2 className="section-title">Dataset Summary</h2>
                </div>
                <div className="section-divider" />
                <div className="dataset-panel">
                  <table className="dataset-table">
                    <thead>
                      <tr>
                        <th>File name</th>
                        <th>Rows</th>
                        <th>Columns</th>
                        <th>Last analysis</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{datasetInfo.fileName}</td>
                        <td>{Number(datasetInfo.rows).toLocaleString()}</td>
                        <td>{datasetInfo.columns}</td>
                        <td>{datasetInfo.analysisDate || "—"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* KPI Cards */}
            <section className="db-section">
              <div className="section-header">
                <h2 className="section-title">Key Metrics</h2>
              </div>
              <div className="section-divider" />

              <div className="kpi-row kpi-row-top">
                {/* Hero card */}
                <div className="kpi-card hero">
                  <p className="kpi-label">Total Sales</p>
                  <p className="kpi-value hero-val">
                    {"₹ " + Number(analysis.total_sales || 0).toLocaleString()}
                  </p>
                </div>
                <KpiCard label="Average Sale"  value={"₹ " + Number(analysis.avg_sales    || 0).toFixed(2)} />
                <KpiCard label="Total Orders"  value={Number(analysis.total_orders || 0).toLocaleString()} />
                <KpiCard label="Highest Sale"  value={"₹ " + Number(analysis.highest_sale || 0).toLocaleString()} />
                <KpiCard label="Lowest Sale"   value={"₹ " + Number(analysis.lowest_sale  || 0).toLocaleString()} />
              </div>

              {analysis.top_category && (
                <div className="kpi-row" style={{ gridTemplateColumns: "1fr" }}>
                  <KpiCard label="Top Category" value={analysis.top_category} small />
                </div>
              )}
            </section>

            {/* Dataset Health */}
            <section className="db-section">
              <div className="section-header">
                <h2 className="section-title">Dataset Health</h2>
              </div>
              <div className="section-divider" />
              <div className="health-panel">
                <div className="health-grid">
                  <div className="health-item">
                    <span className="health-item-label">Total rows</span>
                    <span className="health-item-value">
                      {Number(analysis.total_rows || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="health-item">
                    <span className="health-item-label">Total columns</span>
                    <span className="health-item-value">{analysis.total_columns || 0}</span>
                  </div>
                  <div className="health-item">
                    <span className="health-item-label">Missing values</span>
                    <span className={`health-item-value ${(analysis.missing_values || 0) > 0 ? "warn" : "good"}`}>
                      {analysis.missing_values || 0}
                    </span>
                  </div>
                  <div className="health-item">
                    <span className="health-item-label">Duplicate rows</span>
                    <span className={`health-item-value ${(analysis.duplicate_rows || 0) > 0 ? "warn" : "good"}`}>
                      {analysis.duplicate_rows || 0}
                    </span>
                  </div>
                </div>

                <div className="quality-bar-wrap">
                  <div className="quality-bar-header">
                    <span className="quality-bar-label">Quality score</span>
                    <span className="quality-bar-score">{qualityScore}%</span>
                  </div>
                  <div className="quality-bar-track">
                    <div
                      className={`quality-bar-fill ${isLowQuality ? "warn-fill" : ""}`}
                      style={{ width: `${qualityScore}%` }}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Charts */}
            {analysis.category_chart && (
              <section className="db-section">
                <div className="section-header">
                  <h2 className="section-title">Category Analysis</h2>
                </div>
                <div className="section-divider" />
                <div className="charts-grid">
                  <div className="chart-card">
                    <p className="chart-card-title">Distribution</p>
                    <DynamicPieChart data={analysis.category_chart} colors={CHART_COLORS} />
                  </div>
                  <div className="chart-card">
                    <p className="chart-card-title">By Category</p>
                    <DynamicBarChart data={analysis.category_chart} colors={CHART_COLORS} />
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </>
  );
}

function KpiCard({ label, value, small }) {
  return (
    <div className="kpi-card">
      <p className="kpi-label">{label}</p>
      <p className={`kpi-value${small ? " small" : ""}`}>{value}</p>
    </div>
  );
}

export default Dashboard;