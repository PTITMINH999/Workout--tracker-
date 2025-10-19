// AddExerciseForm.jsx
import React, { useState, useEffect } from "react";
import instance from "../../utils/axiosConfig";
import { toast } from "react-toastify";

/**
 * Props:
 * - workoutId
 * - onAdded() callback to refresh list
 *
 * Note: this component expects backend /exercises endpoint exists for listing exercises.
 */

const AddExerciseForm = ({ workoutId, onAdded }) => {
  const [exercises, setExercises] = useState([]);
  const [form, setForm] = useState({
    exerciseId: "",
    sets: 3,
    reps: 10,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // try load exercises (assuming /exercises exists)
    let cancelled = false;
    const load = async () => {
      try {
        const res = await instance.get("/exercises");
        if (!cancelled) setExercises(res.data.result || []);
      } catch (e) {
        // ignore - maybe no endpoint in minimal setup
      }
    };
    load();
    return () => (cancelled = true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.exerciseId) return toast.warning("Chọn exercise");
    try {
      setLoading(true);
      await instance.post("/workout-exercises", {
        workoutId,
        exerciseId: Number(form.exerciseId),
        sets: Number(form.sets),
        reps: Number(form.reps),
      });
      toast.success("Added exercise to workout");
      setForm({ exerciseId: "", sets: 3, reps: 10 });
      onAdded && onAdded();
    } catch (err) {
      toast.error(err.response?.data?.message || "Add exercise failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mt-4">
      <div className="grid grid-cols-3 gap-2">
        <select
          value={form.exerciseId}
          onChange={(e) => setForm({ ...form, exerciseId: e.target.value })}
          className="col-span-2 border rounded px-3 py-2"
        >
          <option value="">-- Select Exercise --</option>
          {exercises.map((ex) => (
            <option key={ex.id} value={ex.id}>
              {ex.name || ex.exerciseName || `${ex.id}`}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <input
            type="number"
            min="1"
            className="w-full border rounded px-2 py-2"
            value={form.sets}
            onChange={(e) => setForm({ ...form, sets: e.target.value })}
            placeholder="Sets"
          />
          <input
            type="number"
            min="1"
            className="w-full border rounded px-2 py-2"
            value={form.reps}
            onChange={(e) => setForm({ ...form, reps: e.target.value })}
            placeholder="Reps"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          {loading ? "Adding..." : "Add Exercise"}
        </button>
      </div>
    </form>
  );
};

export default AddExerciseForm;
