import { Link } from "react-router-dom";

function Navbar() {
  const userName = localStorage.getItem("userName") || "User";
  const userInitial = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <header style={styles.navbar}>
      {/* Left — page context lives in the page itself now; navbar just
          carries the primary action + identity, sidebar owns nav+brand */}
      <div style={styles.left} />

      {/* Right — user info + actions */}
      <div style={styles.right}>
        <Link to="/upload" style={styles.uploadBtn}>
          <span aria-hidden="true">↑</span> Upload Dataset
        </Link>

        <div style={styles.divider} />

        <div style={styles.userRow}>
          <div style={styles.avatar}>{userInitial}</div>
          <div style={styles.userInfo}>
            <div style={styles.userName}>{userName}</div>
            <div style={styles.userRole}>Analyst</div>
          </div>
        </div>

        <button onClick={handleLogout} style={styles.logoutBtn}>
          <span aria-hidden="true">←</span> Sign out
        </button>
      </div>
    </header>
  );
}

const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 32px",
    height: "64px",
    background: "#FDFAF5",
    borderBottom: "1px solid #E2DBCF",
    position: "sticky",
    top: 0,
    zIndex: 90,
    gap: "16px",
    fontFamily: "'Inter', Arial, sans-serif",
  },
  left: {
    flex: 1,
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    flexShrink: 0,
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    padding: "9px 18px",
    background: "#2C2A25",
    color: "#F5F0E8",
    borderRadius: "6px",
    fontSize: "12.5px",
    fontWeight: "500",
    letterSpacing: "0.03em",
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "background-color 0.2s",
  },
  divider: {
    width: "1px",
    height: "28px",
    background: "#E2DBCF",
  },
  userRow: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
  },
  avatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#C8A96E",
    color: "#2C2A25",
    fontSize: "13px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  userInfo: {
    lineHeight: 1.25,
  },
  userName: {
    fontSize: "12.5px",
    fontWeight: "600",
    color: "#2C2A25",
  },
  userRole: {
    fontSize: "11px",
    color: "#9A9288",
  },
  logoutBtn: {
    padding: "8px 14px",
    background: "transparent",
    border: "1px solid #D8D2C6",
    borderRadius: "6px",
    fontSize: "12.5px",
    fontWeight: "500",
    color: "#4A4640",
    cursor: "pointer",
    whiteSpace: "nowrap",
    fontFamily: "inherit",
  },
};

export default Navbar;