import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function RegionBarChart({ data }) {
  return (
    <BarChart
      width={700}
      height={350}
      data={data}
    >
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="region" />

      <YAxis />

      <Tooltip />

      <Bar
        dataKey="sales"
        fill="#82ca9d"
      />
    </BarChart>
  );
}

export default RegionBarChart;