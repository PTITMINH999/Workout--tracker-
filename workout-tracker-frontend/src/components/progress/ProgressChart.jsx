import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

const ProgressChart = ({ data }) => {
  const chartData = data.map((p) => ({
    date: new Date(p.date).toLocaleDateString(),
    weight: p.weight,
    bodyFat: p.bodyFat,
  }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" orientation="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="weight"
            stroke="#2563eb"
            name="Weight (kg)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="bodyFat"
            stroke="#f59e0b"
            name="Body Fat (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
