// src/components/stats/FavoriteExerciseList.jsx
import React from "react";

const FavoriteExerciseList = ({ favorites }) => {
  if (!favorites) return <div className="text-gray-500">Loading...</div>;
  if (!favorites.length)
    return (
      <div className="text-center text-gray-500 italic">
        No favorite exercises yet.
      </div>
    );

  return (
    <ul className="space-y-3">
      {favorites.map((ex) => (
        <li
          key={ex.exerciseId}
          className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border hover:bg-gray-50 transition"
        >
          <div>
            <div className="font-medium text-gray-800">{ex.exerciseName}</div>
            <div className="text-sm text-gray-500">ID: {ex.exerciseId}</div>
          </div>
          <div className="text-indigo-600 font-semibold">{ex.timesUsed}x</div>
        </li>
      ))}
    </ul>
  );
};

export default FavoriteExerciseList;
