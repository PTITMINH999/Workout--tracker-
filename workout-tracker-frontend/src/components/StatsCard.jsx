import React from "react";

const StatsCard = ({ title, value, color = "bg-blue-500" }) => {
  return (
    <div className={`p-4 rounded shadow ${color} text-white`}>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default StatsCard;
