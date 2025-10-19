import React from "react";

const WorkoutItem = ({ workout }) => {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-md transition">
      <h3 className="font-semibold">{workout.name}</h3>
      <p>Calories: {workout.calories}</p>
      <p>Duration: {workout.duration} min</p>
      <p>Date: {new Date(workout.date).toLocaleDateString()}</p>
    </div>
  );
};

export default WorkoutItem;
