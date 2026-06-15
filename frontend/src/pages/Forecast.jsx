import { useState } from "react";
import API from "../api/api";

function Forecast() {
  const [formData, setFormData] = useState({
    category: "",
    region: "",
    quantity: "",
    month: ""
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "quantity" || name === "month"
          ? Number(value)
          : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post(
        "/predict",
        formData
      );

      setPrediction(
        response.data.predicted_sales
      );
    } catch (error) {
      console.error(error);
      alert("Prediction Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Sales Forecast</h1>

      <form onSubmit={handleSubmit}>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="Technology">
            Technology
          </option>
          <option value="Furniture">
            Furniture
          </option>
          <option value="Office Supplies">
            Office Supplies
          </option>
        </select>

        <br />
        <br />

        <select
          name="region"
          value={formData.region}
          onChange={handleChange}
        >
          <option value="">Select Region</option>
          <option value="West">West</option>
          <option value="East">East</option>
          <option value="Central">Central</option>
          <option value="South">South</option>
        </select>

        <br />
        <br />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="number"
          name="month"
          placeholder="Month (1-12)"
          min="1"
          max="12"
          value={formData.month}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
          Predict Sales
        </button>
      </form>

      {prediction !== null && (
        <h2>
          Predicted Sales: ₹ {prediction}
        </h2>
      )}
    </div>
  );
}

export default Forecast;