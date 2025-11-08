import React from "react";
import { format } from "date-fns";

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800 border border-yellow-300",
  ACTIVE: "bg-blue-100 text-blue-800 border border-blue-300",
  COMPLETED: "bg-green-100 text-green-800 border border-green-300",
  CANCELLED: "bg-red-100 text-red-800 border border-red-300",
};

const WorkoutList = ({
  workouts,
  onView,
  onEdit,
  onDelete,
  onComplete,
  onCancel,
}) => {
  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-2xl border border-gray-200">
      <table className="min-w-full border-collapse">
        {/* 🔹 Header */}
        <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">
              Date
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">
              User
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">
              Notes
            </th>
            <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide">
              Status
            </th>
            <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide">
              Actions
            </th>
          </tr>
        </thead>

        {/* 🔹 Body */}
        <tbody className="divide-y divide-gray-100">
          {workouts.map((w) => (
            <tr
              key={w.id}
              className="hover:bg-blue-50 transition-all duration-150 ease-in-out"
            >
              <td className="px-6 py-3 text-gray-800 font-medium">
                {w.date ? format(new Date(w.date), "dd/MM/yyyy HH:mm") : "—"}
              </td>
              <td className="px-6 py-3 text-gray-700">{w.username || "—"}</td>
              <td className="px-6 py-3 text-gray-600 italic">
                {w.notes || "—"}
              </td>
              <td className="px-6 py-3 text-center">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    statusColors[w.status] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {w.status}
                </span>
              </td>
              <td className="px-6 py-3 text-center flex justify-center flex-wrap gap-2">
                <button
                  onClick={() => onView(w)}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition"
                >
                  View
                </button>
                <button
                  onClick={() => onEdit(w)}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-yellow-500 rounded-full hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(w.id)}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-full hover:bg-red-700 transition"
                >
                  Delete
                </button>

                {w.status !== "COMPLETED" && w.status !== "CANCELLED" && (
                  <>
                    <button
                      onClick={() => onComplete(w.id)}
                      className="px-3 py-1.5 text-xs font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => onCancel(w.id)}
                      className="px-3 py-1.5 text-xs font-medium text-white bg-gray-500 rounded-full hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔹 Empty State */}
      {workouts.length === 0 && (
        <div className="text-center py-6 text-gray-500 text-sm">
          No workouts found
        </div>
      )}
    </div>
  );
};

export default WorkoutList;
