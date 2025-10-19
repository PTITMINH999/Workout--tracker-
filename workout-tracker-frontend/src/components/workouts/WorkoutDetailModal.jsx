import React, { useEffect, useState, useContext } from "react";
import { workoutExerciseApi } from "../../api/workoutExerciseApi";
import { workoutApi } from "../../api/workoutApi";
import { toast } from "react-toastify";
import AddExerciseForm from "./AddExerciseForm";

/**
 * Props:
 * - workout: workout object
 * - onClose()
 * - refreshParent() optional
 */

const WorkoutDetailModal = ({ workout, onClose, refreshParent }) => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [calories, setCalories] = useState(null);

  const fetchDetails = async () => {
    if (!workout) return;
    try {
      setLoading(true);
      const res = await workoutExerciseApi.getByWorkout(workout.id);
      setExercises(res.data.result || []);
      // get calories
      const calRes = await workoutApi.getCalories(workout.id);
      setCalories(calRes.data.result);
    } catch (err) {
      toast.error("Cannot load workout details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line
  }, [workout]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl p-6 shadow-lg overflow-auto max-h-[90vh]">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">
              Workout: {new Date(workout.date).toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600">User: {workout.username}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>

        <p className="mt-4 text-gray-700 italic">
          {workout.notes || "No notes"}
        </p>

        <div className="mt-4">
          <h4 className="font-medium">Exercises</h4>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : exercises.length ? (
            <div className="mt-2 space-y-2">
              {exercises.map((ex) => (
                <div
                  key={ex.id}
                  className="flex justify-between items-center border rounded p-3"
                >
                  <div>
                    <div className="font-medium">{ex.exerciseName}</div>
                    <div className="text-sm text-gray-600">
                      Sets: {ex.sets} • Reps: {ex.reps}
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">ID: {ex.id}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-2">No exercises in this workout</p>
          )}
        </div>

        <div className="mt-4">
          <h4 className="font-medium">Total Calories</h4>
          <p className="text-gray-700 mt-1">
            {calories ? `${calories.totalCalories} kcal` : "—"}
          </p>
        </div>

        <AddExerciseForm
          workoutId={workout.id}
          onAdded={() => {
            fetchDetails();
            refreshParent && refreshParent();
          }}
        />
      </div>
    </div>
  );
};

export default WorkoutDetailModal;
