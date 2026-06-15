import { useEffect, useState } from "react";
import API from "../api/api";

function Analytics() {

  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    API.get("/analytics")
      .then((response) => {
        setAnalytics(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Analytics</h1>

      <h2>
        Best Product:
        {analytics.best_product}
      </h2>

      <h2>
        Top Region:
        {analytics.top_region}
      </h2>

      <h2>
        Top Category:
        {analytics.top_category}
      </h2>
    </div>
  );
}

export default Analytics;