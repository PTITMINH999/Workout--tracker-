// src/api/statsApi.js
import instance from "../utils/axiosConfig";

export const statsApi = {
  getMonthlyStats: (userId, year, month) =>
    instance.get("/stats/workouts", { params: { userId, year, month } }),

  getFavoriteExercises: (userId, limit = 5) =>
    instance.get("/stats/favorites", { params: { userId, limit } }),

  getWeeklyStats: (userId) =>
    instance.get("/stats/weekly", { params: { userId } }),

  getWeeklyDailyStats: (userId) =>
    instance.get(`/stats/weekly-daily`, { params: { userId } }),
};
