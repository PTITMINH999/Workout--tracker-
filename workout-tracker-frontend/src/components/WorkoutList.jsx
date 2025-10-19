import React, { useState } from "react";
import WorkoutItem from "./WorkoutItem";

const WorkoutList = ({ workouts = [] }) => {
  const [page, setPage] = useState(0);
  const pageSize = 6;

  const safeWorkouts = Array.isArray(workouts) ? workouts : [];
  const paginated = safeWorkouts.slice(page * pageSize, (page + 1) * pageSize);
  const totalPages = Math.ceil(safeWorkouts.length / pageSize);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginated.map((w) => (
          <WorkoutItem key={w.id} workout={w} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-3 py-1">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={page === totalPages - 1}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkoutList;
