// src/pages/StatsPage.jsx
import React, { useContext, useEffect, useState } from "react";
import { statsApi } from "../api/statsApi";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import WorkoutStatsCard from "../components/stats/WorkoutStatsCard";
import FavoriteExerciseList from "../components/stats/FavoriteExerciseList";
import WeeklyChart from "../components/stats/WeeklyChart";

const StatsPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [monthlyStats, setMonthlyStats] = useState(null);
  const [weeklyStats, setWeeklyStats] = useState(null);
  const [dailyStats, setDailyStats] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const today = new Date();

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      try {
        const [monthRes, favRes, weekRes, dailyRes] = await Promise.all([
          statsApi.getMonthlyStats(
            user.id,
            today.getFullYear(),
            today.getMonth() + 1
          ),
          statsApi.getFavoriteExercises(user.id),
          statsApi.getWeeklyStats(user.id),
          statsApi.getWeeklyDailyStats(user.id),
        ]);

        setMonthlyStats(monthRes?.data?.result ?? null);
        setFavorites(favRes?.data?.result ?? []);
        setWeeklyStats(weekRes?.data?.result ?? null);

        // ✅ Map dữ liệu từ backend sang dạng hiển thị biểu đồ
        const mappedDaily = (dailyRes?.data?.result ?? []).map((d) => ({
          day: d.day.charAt(0).toUpperCase() + d.day.slice(1).toLowerCase(), // "MON" -> "Mon"
          workouts: d.workouts,
          calories: d.calories,
        }));

        setDailyStats(mappedDaily);
      } catch (e) {
        console.error("Fetch stats error:", e);
        toast.error("Failed to load stats");
      }
    };

    fetchStats();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Workout Stats</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <WorkoutStatsCard
          stats={monthlyStats}
          title="Monthly Stats"
          gradientFrom="#06B6D4"
          gradientTo="#3B82F6"
        />
        <WorkoutStatsCard
          stats={weeklyStats ?? { totalWorkouts: 0, totalCalories: 0 }}
          title="Weekly Stats"
          gradientFrom="#F97316"
          gradientTo="#F43F5E"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-2xl p-5">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Favorite Exercises
          </h3>
          <FavoriteExerciseList favorites={favorites} />
        </div>

        {/* ✅ Biểu đồ tuần (có cả workouts & calories) */}
        <WeeklyChart stats={{ dailyWorkouts: dailyStats }} />
      </div>
    </div>
  );
};

export default StatsPage;
