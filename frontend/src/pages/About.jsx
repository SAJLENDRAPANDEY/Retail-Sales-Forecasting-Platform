function AboutSection() {
  const skills = [
    "React", "FastAPI", "Python", "PostgreSQL",
    "Machine Learning", "Power BI", "Pandas", "scikit-learn",
  ];

  const stats = [
    { num: "300+", label: "DSA problems solved" },
    { num: "8.2",  label: "CGPA / 10" },
    { num: "6+",   label: "Live projects deployed" },
    { num: "2027", label: "Expected graduation" },
  ];

  const links = [
    {
      icon: "📧",
      title: "Email",
      sub: "sajlendrapandey2022@gmail.com",
      href: "mailto:sajlendrapandey2022@gmail.com",
      bg: "#eff6ff",
      color: "#1d4ed8",
    },
    {
      icon: "💼",
      title: "LinkedIn",
      sub: "in/sajlendrapandey",
      href: "https://www.linkedin.com/in/sajlendrapandey",
      bg: "#eff6ff",
      color: "#1d4ed8",
    },
    {
      icon: "💻",
      title: "GitHub",
      sub: "SAJLENDRAPANDEY",
      href: "https://github.com/SAJLENDRAPANDEY",
      bg: "#f1f5f9",
      color: "#374151",
    },
    {
      icon: "🌐",
      title: "Portfolio",
      sub: "sajlendrapandey.netlify.app",
      href: "https://sajlendrapandey.netlify.app",
      bg: "#f0fdf4",
      color: "#16a34a",
    },
  ];

  const stack = [
    { icon: "⚛️", name: "React",      role: "Frontend"      },
    { icon: "⚡", name: "FastAPI",    role: "Backend"       },
    { icon: "🐍", name: "Python",     role: "Analytics & ML" },
    { icon: "🗃️", name: "PostgreSQL", role: "Database"      },
  ];

  return (
    <section style={styles.root}>
      <div style={styles.inner}>

        {/* ── TOP GRID ── */}
        <div style={styles.topGrid}>

          {/* LEFT — platform description */}
          <div>
            <span style={styles.tag}>About the platform</span>

            <h2 style={styles.heading}>
              Built for analysts.{" "}
              <span style={{ color: "#2563eb" }}>Not just developers.</span>
            </h2>

            <p style={styles.lead}>
              Smart Data Analytics Platform turns messy spreadsheets into clean,
              actionable dashboards — without writing a single line of code.
              Upload a CSV, and within seconds you have KPIs, trend charts, and
              forecast models ready to share.
            </p>

            <p style={styles.sub}>
              Designed for business analysts, data science students, and product
              teams who need fast answers from their data. The platform handles
              everything from data quality checks to ML-powered forecasting, then
              packages it into a presentation-ready PDF.
            </p>

            <div style={styles.skillsRow}>
              {skills.map((s) => (
                <span key={s} style={styles.skill}>{s}</span>
              ))}
            </div>
          </div>

          {/* RIGHT — profile card + stats + links */}
          <div style={styles.rightCol}>

            {/* Profile card */}
            <div style={styles.profileCard}>
              <div style={styles.avatar}>SP</div>
              <div>
                <div style={styles.avatarName}>Sajlendra Pandey</div>
                <div style={styles.avatarRole}>
                  B.Tech CS (Data Science) · MDU Rohtak
                </div>
                <div style={styles.openBadge}>✓ Open to internships</div>
              </div>
            </div>

            {/* Stats 2×2 */}
            <div style={styles.statGrid}>
              {stats.map((s) => (
                <div key={s.label} style={styles.statCard}>
                  <div style={styles.statNum}>{s.num}</div>
                  <div style={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Link cards 2×2 */}
            <div style={styles.linkGrid}>
              {links.map((l) => (
                <a
                  key={l.title}
                  href={l.href}
                  target={l.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  style={styles.linkCard}
                >
                  <div
                    style={{
                      ...styles.linkIcon,
                      background: l.bg,
                      color: l.color,
                    }}
                  >
                    {l.icon}
                  </div>
                  <div>
                    <div style={styles.linkTitle}>{l.title}</div>
                    <div style={styles.linkSub}>{l.sub}</div>
                  </div>
                </a>
              ))}
            </div>

          </div>
        </div>

        {/* ── DIVIDER ── */}
        <hr style={styles.divider} />

        {/* ── TECH STACK ── */}
        <div style={styles.stackLabel}>Built with</div>
        <div style={styles.stackGrid}>
          {stack.map((item) => (
            <div key={item.name} style={styles.stackCard}>
              <div style={styles.stackIcon}>{item.icon}</div>
              <div style={styles.stackName}>{item.name}</div>
              <div style={styles.stackRole}>{item.role}</div>
            </div>
          ))}
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

  /* top two-column grid */
  topGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "64px",
    alignItems: "start",
    marginBottom: "60px",
  },

  /* LEFT */
  tag: {
    display: "inline-block",
    fontSize: "12px",
    fontWeight: "700",
    color: "#1d4ed8",
    background: "#eff6ff",
    border: "0.5px solid #bfdbfe",
    padding: "4px 12px",
    borderRadius: "20px",
    marginBottom: "18px",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
  heading: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#0f172a",
    lineHeight: "1.25",
    marginBottom: "16px",
    letterSpacing: "-0.4px",
  },
  lead: {
    fontSize: "15px",
    color: "#475569",
    lineHeight: "1.8",
    marginBottom: "18px",
  },
  sub: {
    fontSize: "14px",
    color: "#64748b",
    lineHeight: "1.75",
  },
  skillsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "26px",
  },
  skill: {
    fontSize: "12px",
    color: "#374151",
    background: "#fff",
    border: "0.5px solid #d5d0c8",
    padding: "5px 12px",
    borderRadius: "6px",
    fontWeight: "600",
  },

  /* RIGHT */
  rightCol: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  profileCard: {
    background: "#fff",
    border: "0.5px solid #e2ddd7",
    borderRadius: "12px",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  avatar: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    background: "#2563eb",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  avatarName: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#111827",
  },
  avatarRole: {
    fontSize: "13px",
    color: "#6b7280",
    marginTop: "2px",
  },
  openBadge: {
    display: "inline-block",
    marginTop: "6px",
    fontSize: "11px",
    color: "#16a34a",
    background: "#f0fdf4",
    border: "0.5px solid #bbf7d0",
    padding: "2px 9px",
    borderRadius: "20px",
  },

  /* stats */
  statGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
  statCard: {
    background: "#fff",
    border: "0.5px solid #e2ddd7",
    borderRadius: "12px",
    padding: "18px 20px",
  },
  statNum: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#2563eb",
    lineHeight: 1,
    marginBottom: "4px",
  },
  statLabel: {
    fontSize: "12px",
    color: "#6b7280",
  },

  /* link cards */
  linkGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  },
  linkCard: {
    background: "#fff",
    border: "0.5px solid #e2ddd7",
    borderRadius: "10px",
    padding: "14px 16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
  },
  linkIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px",
    flexShrink: 0,
  },
  linkTitle: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#111827",
  },
  linkSub: {
    fontSize: "11px",
    color: "#9ca3af",
    marginTop: "1px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "130px",
  },

  /* divider */
  divider: {
    border: "none",
    borderTop: "0.5px solid #e5e0d8",
    margin: "0 0 40px",
  },

  /* tech stack */
  stackLabel: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#2563eb",
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    marginBottom: "16px",
  },
  stackGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "12px",
  },
  stackCard: {
    background: "#fff",
    border: "0.5px solid #e2ddd7",
    borderRadius: "10px",
    padding: "16px",
    textAlign: "center",
  },
  stackIcon: {
    fontSize: "22px",
    marginBottom: "8px",
  },
  stackName: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#374151",
    marginBottom: "3px",
  },
  stackRole: {
    fontSize: "11px",
    color: "#9ca3af",
  },
};

export default AboutSection;