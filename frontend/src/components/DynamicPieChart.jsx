import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend
} from "recharts";

function DynamicPieChart({
  data,
  colors = [
    "#C8A96E",
    "#2C2A25",
    "#8C7355",
    "#B45309",
    "#7A7468",
    "#D8C9A3"
  ]
}) {
  return (
    <ResponsiveContainer
      width="100%"
      height={320}
    >
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={110}
          label
        >
          {data?.map(
            (entry, index) => (
              <Cell
                key={index}
                fill={
                  colors[
                    index %
                      colors.length
                  ]
                }
              />
            )
          )}
        </Pie>

        <Tooltip />

        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default DynamicPieChart;