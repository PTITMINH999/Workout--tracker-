// src/components/stats/WorkoutStatsCard.jsx
import React from "react";

const WorkoutStatsCard = ({
  stats,
  title,
  gradientFrom = "#6366F1",
  gradientTo = "#818CF8",
}) => {
  if (!stats)
    return (
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <p className="text-gray-500">Loading...</p>
      </div>
    );

  return (
    <div
      className="rounded-2xl p-6 text-white shadow-md"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
      }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm opacity-90 mt-1">
            {stats.month
              ? `Tháng ${stats.month} • ${stats.year}`
              : "Tuần hiện tại"}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <div className="text-2xl font-bold">{stats.totalWorkouts ?? 0}</div>
        <div className="text-sm opacity-90">Total workouts</div>

        <div className="mt-4 text-2xl font-bold">
          {typeof stats.totalCalories === "number"
            ? stats.totalCalories.toFixed(1)
            : "0.0"}
        </div>
        <div className="text-sm opacity-90">Total calories</div>
      </div>
    </div>
  );
};

export default WorkoutStatsCard;
