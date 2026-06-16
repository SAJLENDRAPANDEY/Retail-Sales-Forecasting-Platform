import {
  PieChart,
  Pie,
  Tooltip
} from "recharts";

function DynamicPieChart({
  data
}) {

  return (

    <PieChart
      width={500}
      height={300}
    >

      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        outerRadius={100}
      />

      <Tooltip />

    </PieChart>

  );

}

export default DynamicPieChart;