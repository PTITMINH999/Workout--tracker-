import React from "react";
import { format } from "date-fns";

const WorkoutCard = ({ workout, onView, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">
            {format(new Date(workout.date), "dd/MM/yyyy HH:mm")}
          </h3>
          <p className="text-sm text-gray-600">
            User: {workout.username || "—"}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onView(workout)}
            className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
          >
            View
          </button>
          <button
            onClick={() => onEdit(workout)}
            className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(workout)}
            className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
      <p className="mt-3 text-gray-700 italic">{workout.notes || "No notes"}</p>
    </div>
  );
};

export default WorkoutCard;
