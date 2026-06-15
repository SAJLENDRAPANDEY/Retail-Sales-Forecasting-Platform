import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "#334155",
        padding: "20px"
      }}
    >
      <h3>Menu</h3>

      <ul style={{ listStyle: "none" }}>
        <li>
          <Link to="/">Dashboard</Link>
        </li>

        <li>
          <Link to="/analytics">Analytics</Link>
        </li>

        <li>
          <Link to="/forecast">Forecast</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;