import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import { Dumbbell, Flame } from "lucide-react";

const WeeklyChart = ({ stats }) => {
  if (!stats) return null;

  const data =
    stats.dailyWorkouts && stats.dailyWorkouts.length
      ? stats.dailyWorkouts
      : [
          { day: "Mon", workouts: 0, calories: 0 },
          { day: "Tue", workouts: 0, calories: 0 },
          { day: "Wed", workouts: 0, calories: 0 },
          { day: "Thu", workouts: 0, calories: 0 },
          { day: "Fri", workouts: 0, calories: 0 },
          { day: "Sat", workouts: 0, calories: 0 },
          { day: "Sun", workouts: 0, calories: 0 },
        ];

  const colors = {
    workouts: { from: "#60A5FA", to: "#2563EB" },
    calories: { from: "#FBBF24", to: "#F97316" },
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
      <h3 className="text-xl font-semibold mb-3 text-gray-800 flex items-center gap-2">
        Weekly Progress
      </h3>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{ top: 30, right: 30, left: 10, bottom: 10 }}
          barGap={6}
          barCategoryGap="25%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="day"
            tick={{ fill: "#6b7280", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />

          {/* ✅ Hai trục Y riêng biệt */}
          <YAxis
            yAxisId="left"
            orientation="left"
            tick={{ fill: "#3B82F6", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
            label={{
              value: "Workouts",
              angle: -90,
              position: "insideLeft",
              fill: "#3B82F6",
              fontSize: 12,
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fill: "#F97316", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
            label={{
              value: "Calories",
              angle: 90,
              position: "insideRight",
              fill: "#F97316",
              fontSize: 12,
            }}
          />

          {/* ✅ Tooltip custom, không bị trùng */}
          <Tooltip
            cursor={{ fill: "rgba(99,102,241,0.1)" }}
            contentStyle={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              border: "1px solid #f3f4f6",
              padding: "10px 12px",
            }}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const workouts =
                  payload.find((p) => p.dataKey === "workouts")?.value ?? 0;
                const calories =
                  payload.find((p) => p.dataKey === "calories")?.value ?? 0;

                return (
                  <div>
                    <p className="text-gray-800 font-semibold mb-1">{label}</p>
                    <p className="text-blue-500 text-sm flex items-center gap-1">
                      💪 Workouts:{" "}
                      <span className="text-gray-800 font-medium">
                        {workouts}
                      </span>
                    </p>
                    <p className="text-orange-500 text-sm flex items-center gap-1">
                      🔥 Calories:{" "}
                      <span className="text-gray-800 font-medium">
                        {calories}
                      </span>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{ top: -10, fontSize: 13 }}
          />

          <defs>
            <linearGradient id="gradWorkouts" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={colors.workouts.from}
                stopOpacity={0.9}
              />
              <stop
                offset="100%"
                stopColor={colors.workouts.to}
                stopOpacity={0.6}
              />
            </linearGradient>
            <linearGradient id="gradCalories" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={colors.calories.from}
                stopOpacity={0.9}
              />
              <stop
                offset="100%"
                stopColor={colors.calories.to}
                stopOpacity={0.6}
              />
            </linearGradient>
          </defs>

          {/* Workouts - trục trái */}
          <Bar
            yAxisId="left"
            dataKey="workouts"
            name="Workouts"
            fill="url(#gradWorkouts)"
            radius={[8, 8, 0, 0]}
          >
            {data.map((_, index) => (
              <Cell
                key={`workout-${index}`}
                style={{
                  filter: "drop-shadow(0px 2px 4px rgba(59,130,246,0.2))",
                }}
              />
            ))}
          </Bar>

          {/* Calories - trục phải */}
          <Bar
            yAxisId="right"
            dataKey="calories"
            name="Calories"
            fill="url(#gradCalories)"
            radius={[8, 8, 0, 0]}
          >
            {data.map((_, index) => (
              <Cell
                key={`cal-${index}`}
                style={{
                  filter: "drop-shadow(0px 2px 4px rgba(249,115,22,0.2))",
                }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 flex justify-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Dumbbell size={16} className="text-blue-500" /> Workouts
        </div>
        <div className="flex items-center gap-1">
          <Flame size={16} className="text-orange-500" /> Calories
        </div>
      </div>
    </div>
  );
};

export default WeeklyChart;
