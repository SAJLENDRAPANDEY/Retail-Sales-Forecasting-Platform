import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

function LandingPage() {
  const barChartRef = useRef(null);

  const features = [
    {
      icon: "📤",
      title: "Excel & CSV Upload",
      desc: "Drag and drop any Excel or CSV file. Auto-detect headers, data types, and schema instantly.",
    },
    {
      icon: "📊",
      title: "Dynamic KPI Dashboard",
      desc: "Auto-generated KPI cards for revenue, growth, churn, and more — updated live as you filter.",
    },
    {
      icon: "📈",
      title: "Interactive Charts",
      desc: "Bar, line, pie, scatter, heatmap and more. Click, zoom, and drill down into any chart.",
    },
    {
      icon: "🔮",
      title: "Sales Forecasting",
      desc: "ML-powered time-series forecasting. Predict next-quarter sales with confidence intervals.",
    },
    {
      icon: "📄",
      title: "PDF Report Export",
      desc: "One-click export of your entire dashboard as a professional, branded PDF report.",
    },
    {
      icon: "🩺",
      title: "Dataset Health Analysis",
      desc: "Detect missing values, outliers, and data quality issues before they skew your insights.",
    },
  ];

  const steps = [
    {
      num: 1,
      title: "Upload your data",
      desc: "Upload any CSV or Excel file. Our parser handles messy headers and mixed types automatically.",
    },
    {
      num: 2,
      title: "Auto-analyze",
      desc: "The platform scans for KPIs, trends, and anomalies and surfaces them immediately.",
    },
    {
      num: 3,
      title: "Build dashboards",
      desc: "Customize your dashboard with drag-and-drop charts, filters, and date range pickers.",
    },
    {
      num: 4,
      title: "Export & share",
      desc: "Export as PDF, share a live link, or embed your dashboard directly in Notion or Confluence.",
    },
  ];

  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "/ month",
      desc: "Perfect for students and personal projects.",
      features: [
        "3 dataset uploads",
        "5 chart types",
        "Basic KPI dashboard",
        "CSV export",
      ],
      cta: "Get started",
      popular: false,
    },
    {
      name: "Pro",
      price: "₹499",
      period: "/ month",
      desc: "For analysts and growing teams.",
      features: [
        "Unlimited uploads",
        "All 12+ chart types",
        "Sales forecasting",
        "PDF report export",
        "Dataset health checks",
      ],
      cta: "Start Pro trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      desc: "For large teams and organizations.",
      features: [
        "Everything in Pro",
        "SSO / SAML",
        "Priority support",
        "Custom integrations",
      ],
      cta: "Contact sales",
      popular: false,
    },
  ];

  const testimonials = [
    {
      stars: 5,
      text: '"Uploaded our quarterly sales CSV and had a full dashboard in under 5 minutes. The forecast feature alone saved us hours of manual Excel work."',
      initials: "AR",
      name: "Ananya Reddy",
      role: "Data Analyst, Flipkart",
    },
    {
      stars: 5,
      text: '"The PDF export is incredibly polished. I share it directly with stakeholders and they always ask what tool I used. Highly recommend."',
      initials: "RK",
      name: "Rohan Kapoor",
      role: "Business Analyst, HDFC",
    },
    {
      stars: 4,
      text: '"Dataset health checks caught 3 data quality issues in my CSV I didn\'t even know were there. Clean data, clean insights."',
      initials: "PS",
      name: "Priya Sharma",
      role: "ML Engineer, Zomato",
    },
  ];

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const salesData = [62,78,55,90,84,105,96,113,88,122,108,130];
  const forecastStart = 8;
  const maxVal = Math.max(...salesData);

  return (
    <div style={styles.root}>

      {/* ── NAVBAR ── */}
      <nav style={styles.nav}>
        <div style={styles.navLogo}>
          <div style={styles.navLogoDot}>📊</div>
          Smart Data Analytics
        </div>
        <div style={styles.navLinks}>
          <Link to="/" style={styles.navLink}>Home</Link>
          <Link to="/about" style={styles.navLink}>About</Link>
          <Link to="/services" style={styles.navLink}>Services</Link>
          <Link to="/pricing" style={styles.navLink}>Pricing</Link>
          <Link to="/login" style={{ ...styles.navLink, ...styles.navLinkOutline }}>Login</Link>
          <Link to="/register" style={{ ...styles.navLink, ...styles.navLinkCta }}>Get started</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <div style={styles.heroBadge}>✨ AI-powered analytics platform</div>
          <h1 style={styles.heroH1}>
            Turn raw data into{" "}
            <span style={{ color: "#2563eb" }}>business insights</span>
          </h1>
          <p style={styles.heroP}>
            Upload Excel and CSV datasets, generate interactive dashboards, run
            sales forecasts, and export professional PDF reports — all in one
            platform.
          </p>
          <div style={styles.heroBtns}>
            <Link to="/register" style={styles.btnPrimary}>🚀 Get started free</Link>
            <Link to="/demo" style={styles.btnOutline}>▶ See demo</Link>
          </div>
        </div>

        {/* Mini dashboard preview */}
        <div style={styles.preview}>
          <div style={styles.previewHeader}>
            <span style={{ ...styles.dot, background: "#ef4444" }} />
            <span style={{ ...styles.dot, background: "#f59e0b" }} />
            <span style={{ ...styles.dot, background: "#22c55e" }} />
            <span style={styles.previewTitle}>Analytics dashboard</span>
          </div>

          {/* KPI row */}
          <div style={styles.miniKpis}>
            {[
              { label: "Revenue", val: "₹2.4M", chg: "+12.4%", up: true },
              { label: "Orders",  val: "1,847",  chg: "+8.1%",  up: true },
              { label: "Churn",   val: "3.2%",   chg: "-0.6%",  up: false },
            ].map((k) => (
              <div key={k.label} style={styles.miniKpi}>
                <div style={styles.miniKpiLabel}>{k.label}</div>
                <div style={styles.miniKpiVal}>{k.val}</div>
                <div style={{ ...styles.miniKpiChg, color: k.up ? "#16a34a" : "#dc2626" }}>
                  {k.chg}
                </div>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div style={styles.chartLabel}>Monthly sales — 2026</div>
          <div style={styles.barChart} ref={barChartRef}>
            {salesData.map((val, i) => (
              <div key={i} style={styles.barWrap}>
                <div
                  style={{
                    ...styles.bar,
                    height: `${Math.round((val / maxVal) * 100)}%`,
                    background: i >= forecastStart ? "#93c5fd" : "#2563eb",
                  }}
                />
                <div style={styles.barLabel}>{months[i]}</div>
              </div>
            ))}
          </div>
          <div style={styles.chartLegend}>
            <span>
              <span style={{ ...styles.legDot, background: "#2563eb" }} />
              Sales
            </span>
            <span>
              <span style={{ ...styles.legDot, background: "#93c5fd" }} />
              Forecast
            </span>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={styles.statsBar}>
        {[
          { num: "500+",  lbl: "Datasets analyzed" },
          { num: "12+",   lbl: "Interactive chart types" },
          { num: "99.9%", lbl: "Uptime SLA" },
          { num: "24/7",  lbl: "Analytics access" },
        ].map((s) => (
          <div key={s.lbl} style={styles.statItem}>
            <div style={styles.statNum}>{s.num}</div>
            <div style={styles.statLbl}>{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* ── FEATURES ── */}
      <section style={styles.section}>
        <div style={styles.sectionLabel}>Platform features</div>
        <h2 style={styles.sectionTitle}>Everything you need to analyze data</h2>
        <p style={styles.sectionSub}>
          From upload to insight in minutes. No SQL or coding required — just
          drag, drop, and explore.
        </p>
        <div style={styles.featGrid}>
          {features.map((f) => (
            <div key={f.title} style={styles.featCard}>
              <div style={styles.featIcon}>{f.icon}</div>
              <div style={styles.featTitle}>{f.title}</div>
              <div style={styles.featDesc}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={styles.howSection}>
        <div style={styles.section}>
          <div style={styles.sectionLabel}>How it works</div>
          <h2 style={styles.sectionTitle}>From upload to insight in 4 steps</h2>
          <div style={styles.stepsGrid}>
            {steps.map((s) => (
              <div key={s.num} style={styles.step}>
                <div style={styles.stepNum}>{s.num}</div>
                <div style={styles.stepTitle}>{s.title}</div>
                <div style={styles.stepDesc}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={styles.section}>
        <div style={styles.sectionLabel}>Pricing</div>
        <h2 style={styles.sectionTitle}>Simple, transparent pricing</h2>
        <p style={styles.sectionSub}>
          Start free. Upgrade as you grow. No hidden fees.
        </p>
        <div style={styles.priceGrid}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              style={{
                ...styles.priceCard,
                border: plan.popular
                  ? "1.5px solid #2563eb"
                  : "0.5px solid #e2ddd7",
              }}
            >
              {plan.popular && (
                <div style={styles.popularBadge}>Most popular</div>
              )}
              <div style={styles.planName}>{plan.name}</div>
              <div style={styles.planPrice}>
                {plan.price}{" "}
                {plan.period && (
                  <span style={styles.planPeriod}>{plan.period}</span>
                )}
              </div>
              <div style={styles.planDesc}>{plan.desc}</div>
              <ul style={styles.planFeatures}>
                {plan.features.map((f) => (
                  <li key={f} style={styles.planFeatureItem}>
                    <span style={styles.checkIcon}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                style={
                  plan.popular
                    ? { ...styles.planBtn, ...styles.planBtnPrimary }
                    : styles.planBtn
                }
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={styles.testiSection}>
        <div style={styles.section}>
          <div style={styles.sectionLabel}>Testimonials</div>
          <h2 style={styles.sectionTitle}>Loved by analysts &amp; developers</h2>
          <div style={styles.testiGrid}>
            {testimonials.map((t) => (
              <div key={t.name} style={styles.testiCard}>
                <div style={styles.testiStars}>
                  {"★".repeat(t.stars)}{"☆".repeat(5 - t.stars)}
                </div>
                <p style={styles.testiText}>{t.text}</p>
                <div style={styles.testiAuthor}>
                  <div style={styles.avatar}>{t.initials}</div>
                  <div>
                    <div style={styles.authorName}>{t.name}</div>
                    <div style={styles.authorRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={styles.ctaBanner}>
        <h2 style={styles.ctaTitle}>Ready to analyze your data?</h2>
        <p style={styles.ctaDesc}>
          Join 500+ analysts already using Smart Data Analytics Platform. Free
          to start — no credit card required.
        </p>
        <div style={styles.ctaBtns}>
          <Link to="/register" style={styles.btnPrimary}>🚀 Start for free</Link>
          <a href="mailto:sajlendrapandey2022@gmail.com" style={styles.btnOutline}>✉ Contact us</a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={styles.footer}>
        <div style={styles.footerTop}>
          <div>
            <div style={styles.footerBrandName}>Smart Data Analytics</div>
            <div style={styles.footerBrandDesc}>
              Built by Sajlendra Pandey — Data Analyst &amp; Software Engineer.
              Making data analysis accessible to everyone.
            </div>
            <div style={styles.footerEmail}>
              📧 sajlendrapandey2022@gmail.com
            </div>
          </div>
          <div>
            <div style={styles.footerColTitle}>Product</div>
            {["Features","Pricing","Changelog","Roadmap"].map((l) => (
              <a key={l} href="#" style={styles.footerLink}>{l}</a>
            ))}
          </div>
          <div>
            <div style={styles.footerColTitle}>Resources</div>
            {["Documentation","API reference","Blog","Status"].map((l) => (
              <a key={l} href="#" style={styles.footerLink}>{l}</a>
            ))}
          </div>
          <div>
            <div style={styles.footerColTitle}>Connect</div>
            <a
              href="https://github.com/SAJLENDRAPANDEY"
              target="_blank"
              rel="noreferrer"
              style={styles.footerLink}
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sajlendra-pandey-37378627b/"
              target="_blank"
              rel="noreferrer"
              style={styles.footerLink}
            >
              LinkedIn
            </a>
            <a
              href="https://sajlendrapandey.netlify.app"
              target="_blank"
              rel="noreferrer"
              style={styles.footerLink}
            >
              Portfolio
            </a>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <span>© 2026 Smart Data Analytics Platform · Sajlendra Pandey</span>
        </div>
      </footer>
    </div>
  );
}

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const styles = {
  root: {
    backgroundColor: "#faf7f2",
    color: "#1a1a2e",
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
  },

  /* NAV */
  nav: {
    background: "#fff",
    borderBottom: "0.5px solid #e5e0d8",
    padding: "0 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "60px",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  navLogo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "17px",
    fontWeight: "600",
    color: "#1a1a2e",
    textDecoration: "none",
  },
  navLogoDot: {
    width: "30px",
    height: "30px",
    background: "#2563eb",
    borderRadius: "7px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  navLink: {
    textDecoration: "none",
    fontSize: "14px",
    color: "#555",
    padding: "6px 12px",
    borderRadius: "7px",
  },
  navLinkOutline: {
    border: "0.5px solid #d0cbc2",
    color: "#333",
  },
  navLinkCta: {
    background: "#2563eb",
    color: "#fff",
    fontWeight: "600",
    borderRadius: "8px",
    padding: "7px 18px",
  },

  /* HERO */
  hero: {
    padding: "80px 40px 60px",
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
    gap: "60px",
  },
  heroLeft: {},
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "#eff6ff",
    border: "0.5px solid #bfdbfe",
    color: "#1d4ed8",
    fontSize: "12px",
    padding: "5px 12px",
    borderRadius: "20px",
    marginBottom: "20px",
    fontWeight: "600",
  },
  heroH1: {
    fontSize: "42px",
    fontWeight: "700",
    lineHeight: "1.2",
    color: "#0f172a",
    marginBottom: "18px",
    letterSpacing: "-0.5px",
  },
  heroP: {
    fontSize: "16px",
    color: "#64748b",
    lineHeight: "1.75",
    marginBottom: "32px",
  },
  heroBtns: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  btnPrimary: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "9px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
  },
  btnOutline: {
    background: "transparent",
    color: "#374151",
    border: "0.5px solid #c5bfb4",
    padding: "12px 24px",
    borderRadius: "9px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
  },

  /* MINI PREVIEW */
  preview: {
    background: "#fff",
    border: "0.5px solid #e2ddd7",
    borderRadius: "14px",
    padding: "18px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
  },
  previewHeader: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "14px",
  },
  dot: {
    width: "9px",
    height: "9px",
    borderRadius: "50%",
    display: "inline-block",
  },
  previewTitle: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    marginLeft: "6px",
  },
  miniKpis: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "8px",
    marginBottom: "14px",
  },
  miniKpi: {
    background: "#f8f5f0",
    borderRadius: "8px",
    padding: "10px 12px",
  },
  miniKpiLabel: { fontSize: "11px", color: "#6b7280" },
  miniKpiVal: { fontSize: "17px", fontWeight: "700", color: "#111827", marginTop: "2px" },
  miniKpiChg: { fontSize: "11px", marginTop: "1px" },
  chartLabel: {
    fontSize: "12px",
    color: "#9ca3af",
    marginBottom: "8px",
    fontWeight: "600",
  },
  barChart: {
    display: "flex",
    alignItems: "flex-end",
    gap: "5px",
    height: "70px",
  },
  barWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    height: "100%",
    justifyContent: "flex-end",
  },
  bar: {
    width: "100%",
    borderRadius: "3px 3px 0 0",
  },
  barLabel: {
    fontSize: "9px",
    color: "#9ca3af",
    marginTop: "3px",
  },
  chartLegend: {
    display: "flex",
    gap: "14px",
    marginTop: "10px",
    fontSize: "11px",
    color: "#6b7280",
  },
  legDot: {
    width: "8px",
    height: "8px",
    borderRadius: "2px",
    display: "inline-block",
    marginRight: "4px",
    verticalAlign: "middle",
  },

  /* STATS */
  statsBar: {
    background: "#fff",
    borderTop: "0.5px solid #e5e0d8",
    borderBottom: "0.5px solid #e5e0d8",
    padding: "36px 40px",
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "20px",
    textAlign: "center",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  statItem: {},
  statNum: { fontSize: "30px", fontWeight: "700", color: "#2563eb" },
  statLbl: { fontSize: "14px", color: "#6b7280", marginTop: "4px" },

  /* SECTIONS COMMON */
  section: {
    padding: "70px 40px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  sectionLabel: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#2563eb",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "10px",
  },
  sectionTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "10px",
    lineHeight: "1.3",
  },
  sectionSub: {
    fontSize: "15px",
    color: "#64748b",
    maxWidth: "520px",
    lineHeight: "1.7",
    marginBottom: "40px",
  },

  /* FEATURES */
  featGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "16px",
  },
  featCard: {
    background: "#fff",
    border: "0.5px solid #e2ddd7",
    borderRadius: "12px",
    padding: "22px 20px",
  },
  featIcon: {
    fontSize: "24px",
    marginBottom: "12px",
    display: "block",
  },
  featTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "6px",
  },
  featDesc: {
    fontSize: "13px",
    color: "#6b7280",
    lineHeight: "1.6",
  },

  /* HOW IT WORKS */
  howSection: {
    background: "#fff",
    borderTop: "0.5px solid #e5e0d8",
    borderBottom: "0.5px solid #e5e0d8",
  },
  stepsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "24px",
    marginTop: "40px",
  },
  step: { textAlign: "center", padding: "20px 12px" },
  stepNum: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "#2563eb",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 14px",
  },
  stepTitle: { fontSize: "15px", fontWeight: "700", color: "#111827", marginBottom: "7px" },
  stepDesc: { fontSize: "13px", color: "#6b7280", lineHeight: "1.6" },

  /* PRICING */
  priceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "16px",
    marginTop: "10px",
  },
  priceCard: {
    background: "#fff",
    borderRadius: "14px",
    padding: "28px 24px",
  },
  popularBadge: {
    display: "inline-block",
    background: "#eff6ff",
    color: "#1d4ed8",
    fontSize: "11px",
    fontWeight: "700",
    padding: "3px 10px",
    borderRadius: "20px",
    marginBottom: "12px",
  },
  planName: { fontSize: "16px", fontWeight: "700", color: "#111827", marginBottom: "6px" },
  planPrice: { fontSize: "32px", fontWeight: "700", color: "#0f172a", marginBottom: "4px" },
  planPeriod: { fontSize: "15px", color: "#6b7280", fontWeight: "400" },
  planDesc: { fontSize: "13px", color: "#6b7280", marginBottom: "20px", lineHeight: "1.5" },
  planFeatures: { listStyle: "none", padding: 0, marginBottom: "24px" },
  planFeatureItem: {
    fontSize: "13px",
    color: "#374151",
    padding: "6px 0",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    borderBottom: "0.5px solid #f3efe8",
  },
  checkIcon: { color: "#16a34a", fontWeight: "700" },
  planBtn: {
    width: "100%",
    padding: "11px",
    borderRadius: "9px",
    border: "0.5px solid #d1ccc4",
    background: "transparent",
    color: "#374151",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  planBtnPrimary: {
    background: "#2563eb",
    borderColor: "#2563eb",
    color: "#fff",
  },

  /* TESTIMONIALS */
  testiSection: {
    background: "#fff",
    borderTop: "0.5px solid #e5e0d8",
  },
  testiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "16px",
    marginTop: "40px",
  },
  testiCard: {
    background: "#faf7f2",
    border: "0.5px solid #e5e0d8",
    borderRadius: "12px",
    padding: "22px 20px",
  },
  testiStars: { color: "#f59e0b", fontSize: "14px", marginBottom: "10px" },
  testiText: { fontSize: "14px", color: "#374151", lineHeight: "1.7", marginBottom: "16px" },
  testiAuthor: { display: "flex", alignItems: "center", gap: "10px" },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    fontWeight: "700",
    color: "#1d4ed8",
    background: "#dbeafe",
    flexShrink: 0,
  },
  authorName: { fontSize: "13px", fontWeight: "700", color: "#111827" },
  authorRole: { fontSize: "12px", color: "#9ca3af" },

  /* CTA */
  ctaBanner: {
    padding: "80px 40px",
    textAlign: "center",
    background: "#eff6ff",
    borderTop: "0.5px solid #bfdbfe",
  },
  ctaTitle: { fontSize: "30px", fontWeight: "700", color: "#0f172a", marginBottom: "14px" },
  ctaDesc: {
    fontSize: "16px",
    color: "#475569",
    marginBottom: "30px",
    maxWidth: "480px",
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: "1.7",
  },
  ctaBtns: { display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" },

  /* FOOTER */
  footer: {
    background: "#0f172a",
    color: "#cbd5e1",
    padding: "50px 40px 30px",
  },
  footerTop: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gap: "40px",
    maxWidth: "1100px",
    margin: "0 auto 40px",
  },
  footerBrandName: { fontSize: "16px", fontWeight: "700", color: "#f1f5f9", marginBottom: "10px" },
  footerBrandDesc: { fontSize: "13px", color: "#64748b", lineHeight: "1.7" },
  footerEmail: { marginTop: "14px", fontSize: "13px", color: "#475569" },
  footerColTitle: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#94a3b8",
    marginBottom: "14px",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  footerLink: {
    display: "block",
    fontSize: "13px",
    color: "#64748b",
    textDecoration: "none",
    marginBottom: "8px",
  },
  footerBottom: {
    borderTop: "0.5px solid #1e293b",
    paddingTop: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "13px",
    color: "#475569",
    maxWidth: "1100px",
    margin: "0 auto",
  },
};

export default LandingPage;