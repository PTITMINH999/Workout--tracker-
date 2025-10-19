// workoutExerciseApi.js
import instance from "../utils/axiosConfig";

export const workoutExerciseApi = {
  add: (payload) => instance.post("/workout-exercises", payload),
  getByWorkout: (workoutId) => instance.get(`/workout-exercises/${workoutId}`),
};
