import React from "react";

const ProgressCard = ({ progress }) => {
  const { date, weight, bodyFat, notes } = progress;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
      <p className="text-sm text-gray-500 mb-1">
        {new Date(date).toLocaleString()}
      </p>
      <p className="text-xl font-semibold text-gray-800">
        Weight: {weight ?? "--"} kg
      </p>
      <p className="text-lg text-gray-700">Body Fat: {bodyFat ?? "--"}%</p>
      {notes && (
        <p className="mt-2 text-gray-600 italic border-t pt-2">{notes}</p>
      )}
    </div>
  );
};

export default ProgressCard;
