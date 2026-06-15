import {
  PieChart,
  Pie,
  Tooltip,
  Legend
} from "recharts";

function CategoryPieChart({ data }) {
  return (
    <PieChart width={500} height={300}>
      <Pie
        data={data}
        dataKey="sales"
        nameKey="category"
        outerRadius={100}
        fill="#8884d8"
        label
      />
      <Tooltip />
      <Legend />
    </PieChart>
  );
}

export default CategoryPieChart;