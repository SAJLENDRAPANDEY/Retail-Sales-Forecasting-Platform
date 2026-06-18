import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts";

function DynamicBarChart({
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
      <BarChart
        data={data}
      >
        <CartesianGrid
          strokeDasharray="3 3"
        />

        <XAxis
          dataKey="name"
        />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="value"
          radius={[
            8,
            8,
            0,
            0
          ]}
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
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default DynamicBarChart;