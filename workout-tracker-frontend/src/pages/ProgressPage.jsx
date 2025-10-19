import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { progressApi } from "../api/progressApi";
import AddProgressForm from "../components/progress/AddProgressForm";
import ProgressChart from "../components/progress/ProgressChart";

const ProgressPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProgress = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const res = await progressApi.getByUser(user.id);
      const data = res.data.result ?? [];
      setProgressData(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (err) {
      console.error("Failed to fetch progress:", err);
      toast.error("Failed to load progress data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (progressId) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await progressApi.delete(progressId);
      toast.success("Progress deleted successfully");
      setProgressData((prev) => prev.filter((p) => p.id !== progressId));
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete progress");
    }
  };

  useEffect(() => {
    fetchProgress();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Progress</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Add Form */}
      <div className="mb-6">
        <AddProgressForm onAdded={fetchProgress} />
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Progress Chart
        </h2>
        {progressData.length > 0 ? (
          <ProgressChart data={progressData} />
        ) : (
          <p className="text-gray-500 italic">
            No progress data yet. Add your first progress above!
          </p>
        )}
      </div>

      {/* History List */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">History</h2>
        {loading ? (
          <p>Loading...</p>
        ) : progressData.length === 0 ? (
          <p className="text-gray-500">No records found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border-b">Date</th>
                  <th className="px-4 py-2 border-b">Weight (kg)</th>
                  <th className="px-4 py-2 border-b">Body Fat (%)</th>
                  <th className="px-4 py-2 border-b">Notes</th>
                  <th className="px-4 py-2 border-b text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {progressData.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2 border-b">
                      {new Date(p.date).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border-b">{p.weight}</td>
                    <td className="px-4 py-2 border-b">{p.bodyFat}</td>
                    <td className="px-4 py-2 border-b">{p.notes || "-"}</td>
                    <td className="px-4 py-2 border-b text-center">
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressPage;
