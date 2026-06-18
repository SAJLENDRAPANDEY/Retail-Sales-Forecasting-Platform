import { Link, useLocation } from "react-router-dom";

// ── Single source of truth ──────────────────────────────────────────────────
// Import this constant in DashboardLayout.jsx too:
//   import { SIDEBAR_WIDTH } from "./Sidebar";
export const SIDEBAR_WIDTH = 230;
// ───────────────────────────────────────────────────────────────────────────

function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navLink = (to, icon, label, disabled = false, soon = false) => {
    if (disabled) {
      return (
        <span key={label} style={{ ...s.navItem, ...s.navItemDisabled }}>
          <span style={s.navIcon}>{icon}</span>
          <span style={s.navLabel}>{label}</span>
          {soon && <span style={s.soonBadge}>Soon</span>}
        </span>
      );
    }
    return (
      <Link
        key={label}
        to={to}
        style={{
          ...s.navItem,
          ...(isActive(to) ? s.navItemActive : {}),
        }}
      >
        <span style={s.navIcon}>{icon}</span>
        <span style={s.navLabel}>{label}</span>
      </Link>
    );
  };

  const userName = localStorage.getItem("userName") || "User";
  const initial  = userName.charAt(0).toUpperCase();

  return (
    <aside style={s.sidebar}>

      {/* ── Brand ── */}
      <div style={s.brand}>
        <div style={s.brandDot} />
        <span style={s.brandName}>Smart Analytics</span>
      </div>

      {/* ── Nav ── */}
      <nav style={s.nav}>

        <span style={s.sectionLabel}>Main</span>
        {navLink("/dashboard",        "▪",  "Dashboard")}
        {navLink("/upload",           "↑",  "Upload Dataset")}

        <span style={s.sectionLabel}>Analysis</span>
        {navLink("/uploaded-analysis","📋", "Uploaded Analysis")}
        {navLink("/analytics",        "📈", "Analytics")}
        {navLink("/forecast",         "🔮", "Forecast")}
        {navLink("/upload-history",   "🕐", "Upload History")}

        <span style={s.sectionLabel}>Reports</span>
        {navLink("", "◑", "Charts",      true, true)}
        {navLink("", "≡", "Data Health", true, true)}

        <span style={s.sectionLabel}>Account</span>
        {navLink("/settings", "⚙", "Settings")}

      </nav>

      {/* ── User footer ── */}
      <div style={s.footer}>
        <div style={s.avatar}>{initial}</div>
        <div style={s.userInfo}>
          <div style={s.userName}>{userName}</div>
          <div style={s.userRole}>Analyst</div>
        </div>
      </div>

    </aside>
  );
}

// ── Styles ──────────────────────────────────────────────────────────────────
const s = {
  sidebar: {
    width:          `${SIDEBAR_WIDTH}px`,
    minHeight:      "100vh",
    background:     "#2C2A25",
    display:        "flex",
    flexDirection:  "column",
    position:       "fixed",
    top:    0,
    left:   0,
    bottom: 0,
    zIndex: 100,
    fontFamily: "'Inter', Arial, sans-serif",
    // No border-right — avoids any sub-pixel width discrepancy
  },

  /* brand */
  brand: {
    display:       "flex",
    alignItems:    "center",
    gap:           "10px",
    padding:       "30px 22px 26px",
    borderBottom:  "1px solid rgba(245,240,232,0.07)",
    flexShrink:    0,
  },
  brandDot: {
    width:        "8px",
    height:       "8px",
    borderRadius: "50%",
    background:   "#C8A96E",
    flexShrink:   0,
  },
  brandName: {
    fontSize:      "11px",
    fontWeight:    "300",
    letterSpacing: "0.17em",
    textTransform: "uppercase",
    color:         "#F5F0E8",
    whiteSpace:    "nowrap",
  },

  /* nav */
  nav: {
    flex:          1,
    padding:       "20px 14px",
    display:       "flex",
    flexDirection: "column",
    gap:           "2px",
    overflowY:     "auto",
  },
  sectionLabel: {
    fontSize:      "10px",
    fontWeight:    "500",
    color:         "rgba(245,240,232,0.28)",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    padding:       "0 8px",
    marginTop:     "18px",
    marginBottom:  "6px",
    display:       "block",
  },
  navItem: {
    display:        "flex",
    alignItems:     "center",
    gap:            "9px",
    padding:        "8px 10px",
    borderRadius:   "6px",
    fontSize:       "13px",
    fontWeight:     "400",
    color:          "rgba(245,240,232,0.52)",
    textDecoration: "none",
    cursor:         "pointer",
    transition:     "background 0.15s, color 0.15s",
  },
  navItemActive: {
    background: "rgba(200,169,110,0.14)",
    color:      "#C8A96E",
    fontWeight: "500",
  },
  navItemDisabled: {
    opacity:       0.4,
    cursor:        "default",
    pointerEvents: "none",
  },
  navIcon: {
    width:      "18px",
    textAlign:  "center",
    fontSize:   "14px",
    flexShrink: 0,
  },
  navLabel: {
    flex:         1,
    whiteSpace:   "nowrap",
    overflow:     "hidden",
    textOverflow: "ellipsis",
  },
  soonBadge: {
    marginLeft:    "auto",
    fontSize:      "9px",
    color:         "rgba(245,240,232,0.28)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    flexShrink:    0,
  },

  /* footer */
  footer: {
    display:       "flex",
    alignItems:    "center",
    gap:           "10px",
    padding:       "16px 18px",
    borderTop:     "1px solid rgba(245,240,232,0.07)",
    flexShrink:    0,
  },
  avatar: {
    width:           "30px",
    height:          "30px",
    borderRadius:    "50%",
    background:      "#C8A96E",
    display:         "flex",
    alignItems:      "center",
    justifyContent:  "center",
    fontSize:        "12px",
    fontWeight:      "600",
    color:           "#2C2A25",
    flexShrink:      0,
  },
  userInfo: {
    flex:    1,
    minWidth: 0,
  },
  userName: {
    fontSize:     "12.5px",
    fontWeight:   "500",
    color:        "rgba(245,240,232,0.85)",
    whiteSpace:   "nowrap",
    overflow:     "hidden",
    textOverflow: "ellipsis",
  },
  userRole: {
    fontSize:   "10.5px",
    color:      "rgba(245,240,232,0.32)",
    fontWeight: "300",
  },
};

export default Sidebar;