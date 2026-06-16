import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "#334155",
        padding: "20px",
        color: "white",
      }}
    >
      <h3>Menu</h3>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
        }}
      >
        <li style={{ marginBottom: "10px" }}>
          <Link to="/">
            Dashboard
          </Link>
        </li>

        <li style={{ marginBottom: "10px" }}>
          <Link to="/analytics">
            Analytics
          </Link>
        </li>

        <li style={{ marginBottom: "10px" }}>
          <Link to="/forecast">
            Forecast
          </Link>
        </li>

        <li style={{ marginBottom: "10px" }}>
          <Link to="/upload">
            Upload Dataset
          </Link>
        </li>

        <li style={{ marginBottom: "10px" }}>
          <Link to="/uploaded-analysis">
            Uploaded Analysis
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;