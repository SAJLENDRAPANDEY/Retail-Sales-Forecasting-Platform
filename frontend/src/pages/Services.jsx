import { Link } from "react-router-dom";

function ServicesSection() {
  const services = [
    {
      icon: "📤",
      num: "01",
      title: "Data upload & processing",
      description:
        "Upload CSV and Excel datasets with automatic header detection, type inference, and preprocessing — ready for analysis in seconds.",
      tag: "CSV · Excel · Auto-clean",
      iconBg: "#eff6ff",
      iconColor: "#2563eb",
      tagBg: "#eff6ff",
      tagColor: "#1d4ed8",
    },
    {
      icon: "🔍",
      num: "02",
      title: "Advanced data analysis",
      description:
        "Discover trends, correlations, and anomalies automatically. Surface the patterns that matter without writing a single query.",
      tag: "Pandas · NumPy · Stats",
      iconBg: "#f0fdf4",
      iconColor: "#16a34a",
      tagBg: "#f0fdf4",
      tagColor: "#15803d",
    },
    {
      icon: "📊",
      num: "03",
      title: "Interactive dashboards",
      description:
        "Live KPI cards, filterable bar charts, line trends, pie breakdowns — all updating in real time as you explore your data.",
      tag: "React · Recharts · Live",
      iconBg: "#faf5ff",
      iconColor: "#7c3aed",
      tagBg: "#faf5ff",
      tagColor: "#6d28d9",
    },
    {
      icon: "🔮",
      num: "04",
      title: "AI-powered forecasting",
      description:
        "Predict next-quarter sales, demand, and revenue using ML time-series models with confidence intervals and scenario planning.",
      tag: "scikit-learn · Prophet",
      iconBg: "#fff7ed",
      iconColor: "#ea580c",
      tagBg: "#fff7ed",
      tagColor: "#c2410c",
    },
    {
      icon: "📄",
      num: "05",
      title: "Automated report generation",
      description:
        "One-click export of your entire dashboard as a polished, branded PDF — complete with charts, KPIs, and executive summaries.",
      tag: "PDF · Excel · Branded",
      iconBg: "#fef2f2",
      iconColor: "#dc2626",
      tagBg: "#fef2f2",
      tagColor: "#b91c1c",
    },
    {
      icon: "📈",
      num: "06",
      title: "Business intelligence",
      description:
        "Transform raw data into strategic intelligence — segment customers, benchmark performance, and identify growth opportunities.",
      tag: "Power BI · SQL · BI",
      iconBg: "#ecfdf5",
      iconColor: "#059669",
      tagBg: "#ecfdf5",
      tagColor: "#047857",
    },
  ];

  const steps = [
    { num: 1, title: "Upload",    sub: "Drop your CSV or Excel file" },
    { num: 2, title: "Analyze",   sub: "Auto-detect KPIs and trends" },
    { num: 3, title: "Visualize", sub: "Build interactive dashboards" },
    { num: 4, title: "Forecast",  sub: "Run ML predictions" },
    { num: 5, title: "Export",    sub: "Download PDF or Excel report" },
  ];

  const headerStats = [
    { num: "6",    label: "Core services" },
    { num: "500+", label: "Datasets processed" },
    { num: "12+",  label: "Chart types" },
  ];

  return (
    <section style={styles.root}>
      <div style={styles.inner}>

        {/* ── HEADER ── */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <span style={styles.tag}>What we offer</span>
            <h2 style={styles.heading}>
              Analytics services built{" "}
              <span style={{ color: "#2563eb" }}>for real decisions</span>
            </h2>
            <p style={styles.sub}>
              From raw data uploads to ML-powered forecasting — every service
              is designed to get you from data to decision faster.
            </p>
          </div>
          <div style={styles.headerStats}>
            {headerStats.map((s) => (
              <div key={s.label} style={styles.hStat}>
                <div style={styles.hStatNum}>{s.num}</div>
                <div style={styles.hStatLbl}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SERVICE CARDS ── */}
        <div style={styles.grid}>
          {services.map((svc) => (
            <div key={svc.num} style={styles.card}>
              <div style={styles.cardTop}>
                <div
                  style={{
                    ...styles.iconBox,
                    background: svc.iconBg,
                    color: svc.iconColor,
                  }}
                >
                  {svc.icon}
                </div>
                <span style={styles.cardNum}>{svc.num}</span>
              </div>
              <div style={styles.cardTitle}>{svc.title}</div>
              <div style={styles.cardDesc}>{svc.description}</div>
              <span
                style={{
                  ...styles.cardTag,
                  background: svc.tagBg,
                  color: svc.tagColor,
                }}
              >
                {svc.tag}
              </span>
            </div>
          ))}
        </div>

        {/* ── DIVIDER ── */}
        <hr style={styles.divider} />

        {/* ── HOW IT WORKS ── */}
        <div style={styles.howLabel}>How it works</div>
        <div style={styles.flow}>
          {steps.map((step, i) => (
            <>
              <div key={step.num} style={styles.flowStep}>
                <div style={styles.flowCircle}>{step.num}</div>
                <div style={styles.flowTitle}>{step.title}</div>
                <div style={styles.flowSub}>{step.sub}</div>
              </div>
              {i < steps.length - 1 && (
                <div key={`arrow-${i}`} style={styles.flowArrow}>→</div>
              )}
            </>
          ))}
        </div>

        {/* ── CTA BANNER ── */}
        <div style={styles.cta}>
          <div>
            <h3 style={styles.ctaTitle}>Ready to try all 6 services?</h3>
            <p style={styles.ctaDesc}>
              Upload your first dataset free — no credit card, no code, no
              setup required.
            </p>
          </div>
          <div style={styles.ctaBtns}>
            <Link to="/register" style={styles.btnPrimary}>
              🚀 Get started free
            </Link>
            <Link to="/about" style={styles.btnOutline}>
              Learn more
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ──────────────────────────────────────────
   STYLES
────────────────────────────────────────── */
const styles = {
  root: {
    backgroundColor: "#faf7f2",
    padding: "72px 40px",
    fontFamily: "Arial, sans-serif",
  },
  inner: {
    maxWidth: "1060px",
    margin: "0 auto",
  },

  /* header */
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "48px",
    gap: "40px",
  },
  headerLeft: {
    maxWidth: "540px",
  },
  tag: {
    display: "inline-block",
    fontSize: "12px",
    fontWeight: "700",
    color: "#1d4ed8",
    background: "#eff6ff",
    border: "0.5px solid #bfdbfe",
    padding: "4px 12px",
    borderRadius: "20px",
    marginBottom: "14px",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
  heading: {
    fontSize: "34px",
    fontWeight: "700",
    color: "#0f172a",
    lineHeight: "1.25",
    marginBottom: "14px",
    letterSpacing: "-0.4px",
  },
  sub: {
    fontSize: "15px",
    color: "#475569",
    lineHeight: "1.8",
  },
  headerStats: {
    display: "flex",
    gap: "24px",
    flexShrink: 0,
  },
  hStat: {
    textAlign: "center",
  },
  hStatNum: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#2563eb",
    lineHeight: 1,
  },
  hStatLbl: {
    fontSize: "12px",
    color: "#6b7280",
    marginTop: "4px",
  },

  /* grid */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "48px",
  },
  card: {
    background: "#fff",
    border: "0.5px solid #e2ddd7",
    borderRadius: "14px",
    padding: "24px 22px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  cardTop: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  iconBox: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    flexShrink: 0,
  },
  cardNum: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#d1d5db",
  },
  cardTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#111827",
    textTransform: "capitalize",
  },
  cardDesc: {
    fontSize: "13px",
    color: "#6b7280",
    lineHeight: "1.7",
    flex: 1,
  },
  cardTag: {
    display: "inline-block",
    fontSize: "11px",
    fontWeight: "600",
    padding: "3px 10px",
    borderRadius: "6px",
    marginTop: "4px",
  },

  /* divider */
  divider: {
    border: "none",
    borderTop: "0.5px solid #e5e0d8",
    margin: "0 0 48px",
  },

  /* how it works */
  howLabel: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#2563eb",
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    marginBottom: "20px",
  },
  flow: {
    display: "grid",
    gridTemplateColumns: "repeat(9, auto)",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "48px",
  },
  flowStep: {
    textAlign: "center",
    padding: "0 8px",
  },
  flowCircle: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "#2563eb",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 10px",
  },
  flowTitle: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "4px",
  },
  flowSub: {
    fontSize: "11px",
    color: "#9ca3af",
    lineHeight: "1.5",
    maxWidth: "90px",
  },
  flowArrow: {
    textAlign: "center",
    color: "#d1d5db",
    fontSize: "18px",
    paddingBottom: "28px",
  },

  /* CTA */
  cta: {
    background: "#eff6ff",
    border: "0.5px solid #bfdbfe",
    borderRadius: "14px",
    padding: "32px 36px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "24px",
  },
  ctaTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "6px",
  },
  ctaDesc: {
    fontSize: "14px",
    color: "#475569",
    lineHeight: "1.6",
  },
  ctaBtns: {
    display: "flex",
    gap: "10px",
    flexShrink: 0,
  },
  btnPrimary: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "11px 22px",
    borderRadius: "9px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    textDecoration: "none",
    whiteSpace: "nowrap",
  },
  btnOutline: {
    background: "transparent",
    color: "#374151",
    border: "0.5px solid #c5bfb4",
    padding: "11px 22px",
    borderRadius: "9px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    textDecoration: "none",
    whiteSpace: "nowrap",
  },
};

export default ServicesSection;