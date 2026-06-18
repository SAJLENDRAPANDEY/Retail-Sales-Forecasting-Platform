import Navbar from "./Navbar";
import Sidebar, { SIDEBAR_WIDTH } from "./Sidebar";

function DashboardLayout({ children }) {
  return (
    <div style={s.shell}>
      <Sidebar />
      <div style={{ ...s.right, marginLeft: SIDEBAR_WIDTH }}>
        <Navbar />
        <main style={s.content}>{children}</main>
      </div>
    </div>
  );
}

const s = {
  shell: {
    display:    "flex",
    minHeight:  "100vh",
    background: "#F5F0E8",
  },
  right: {
    flex:          1,
    minWidth:      0,
    display:       "flex",
    flexDirection: "column",
    minHeight:     "100vh",
  },
  content: {
    flex:       1,
    width:      "100%",
    padding:    "28px 32px",
    boxSizing:  "border-box",
  },
};

export default DashboardLayout;