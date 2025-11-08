import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { workoutApi } from "../api/workoutApi";
import { toast } from "react-toastify";
import WorkoutList from "../components/workouts/WorkoutCard";
import WorkoutDetailModal from "../components/workouts/WorkoutDetailModal";
import EditWorkoutModal from "../components/workouts/EditWorkoutModal";
import { useNavigate } from "react-router-dom";

const WorkoutsPage = () => {
  const { user } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateValue, setDateValue] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const isAdmin = user?.roles?.some((r) => r === "ROLE_ADMIN" || r === "ADMIN");

  const fetchUserWorkouts = async (pageNum = 0) => {
    if (!user?.id) return;
    try {
      setLoading(true);
      let res;
      if (isAdmin) {
        res = await workoutApi.getAll(pageNum, 20);
        const result = res.data.result;
        setWorkouts(result.content || []);
        setTotalPages(result.totalPages);
      } else {
        res = await workoutApi.getByUser(user.id);
        setWorkouts(res.data.result || []);
        setTotalPages(1);
      }
    } catch (err) {
      toast.error("Cannot load workouts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserWorkouts(page);
    // eslint-disable-next-line
  }, [user, page]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!user?.id) return toast.error("User not available (login).");
    if (!dateValue) return toast.warning("Please choose date/time");

    try {
      setLoading(true);
      const localDate = new Date(dateValue);
      const formattedDate = `${localDate.getFullYear()}-${String(
        localDate.getMonth() + 1
      ).padStart(2, "0")}-${String(localDate.getDate()).padStart(
        2,
        "0"
      )}T${String(localDate.getHours()).padStart(2, "0")}:${String(
        localDate.getMinutes()
      ).padStart(2, "0")}:${String(localDate.getSeconds()).padStart(2, "0")}`;

      const payload = { userId: user.id, date: formattedDate, notes };
      await workoutApi.create(payload);
      toast.success("Workout created successfully");
      setNotes("");
      setDateValue("");
      fetchUserWorkouts(0);
      setPage(0);
    } catch (err) {
      toast.error(err.response?.data?.message || "Create workout failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this workout?"))
      return;
    try {
      await workoutApi.delete(id);
      toast.success("Workout deleted successfully");
      fetchUserWorkouts(page);
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const handleComplete = async (id) => {
    try {
      await workoutApi.complete(id);
      toast.success("Workout marked as completed");
      fetchUserWorkouts(page);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to complete workout");
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this workout?"))
      return;
    try {
      await workoutApi.cancel(id);
      toast.success("Workout cancelled");
      fetchUserWorkouts(page);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel workout");
    }
  };

  const handleBackToDashboard = () => navigate("/dashboard");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-700">🏋️‍♂️ Workouts</h1>
        <button
          onClick={handleBackToDashboard}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-all"
        >
          🏠 Dashboard
        </button>
      </div>

      {/* Create Form */}
      <div className="p-6">
        <form
          onSubmit={handleCreate}
          className="bg-white p-4 rounded-lg shadow mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Date & Time
              </label>
              <input
                type="datetime-local"
                value={dateValue}
                onChange={(e) => setDateValue(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 mb-1">Notes</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Optional notes"
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Workout
            </button>
            <button
              type="button"
              onClick={() => fetchUserWorkouts(page)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Refresh
            </button>
          </div>
        </form>

        {/* Workout Table List */}
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <WorkoutList
            workouts={workouts}
            onView={(wk) => setSelectedWorkout(wk)}
            onEdit={(wk) => setEditingWorkout(wk)}
            onDelete={handleDelete}
            onComplete={handleComplete}
            onCancel={handleCancel}
          />
        )}

        {/* Pagination */}
        {isAdmin && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
            >
              Prev
            </button>
            <span>
              Page {page + 1} / {totalPages}
            </span>
            <button
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedWorkout && (
        <WorkoutDetailModal
          workout={selectedWorkout}
          onClose={() => setSelectedWorkout(null)}
          refreshParent={() => fetchUserWorkouts(page)}
        />
      )}
      {editingWorkout && (
        <EditWorkoutModal
          workout={editingWorkout}
          onClose={() => setEditingWorkout(null)}
          onUpdated={() => fetchUserWorkouts(page)}
        />
      )}
    </div>
  );
};

export default WorkoutsPage;
