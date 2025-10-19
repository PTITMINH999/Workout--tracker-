// workoutApi.js
import instance from "../utils/axiosConfig";

export const workoutApi = {
  create: (payload) => instance.post("/workouts", payload),
  getByUser: (userId) => instance.get(`/workouts/user/${userId}`),
  getAll: (page = 0, size = 6) =>
    instance.get("/workouts", { params: { page, size } }),
  getByDate: (dateIso, page = 0, size = 2) =>
    instance.get("/workouts/date", { params: { date: dateIso, page, size } }),

  update: (id, data) => instance.put(`/workouts/${id}`, data),

  delete: (id) => instance.delete(`/workouts/${id}`),

  getCalories: (workoutId) => instance.get(`/workouts/${workoutId}/calories`),
};
